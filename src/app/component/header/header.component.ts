import { Component, OnInit } from '@angular/core';

import { headerConfigs } from '../../configs/config';

import { iconsClass } from '../../enums/enum';
import { WebsocketService } from 'src/app/service/websocket.service';
import { UserService } from 'src/app/service/user.service';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public icons = headerConfigs.icons;
  public _iconsClass = iconsClass;
  public menuConfigs = headerConfigs.menus;
  private allUsers: User[];
  private currentUser: User;
  private isMessageInit: boolean = false

  constructor(private websocketService: WebsocketService, private userService: UserService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.websocketService.newMessageReceived().subscribe(this.onMessagesReceived.bind(this));
    this.websocketService.onNotifyUser().subscribe(this.onNotifyUser.bind(this));


    this.store.select('authUser').subscribe(state => {
      if (state.authUser) {
        this.currentUser = state.authUser;
        this.initGetMessages();
      }
    })
    this.store.select('user').subscribe(userArr => {
      if (userArr.user && userArr.user.length > 0) {
        this.allUsers = userArr.user;
        this.initGetMessages()
      }
    })
    // this.store.select('user').subscribe(userArr=>{
    //   if(userArr && userArr.length > 0){
    //       this.allUsers = userArr;
    //   }
    // })
  }

  initGetMessages() {
    if (this.currentUser && this.allUsers && this.allUsers.length > 0) {
      if (!this.isMessageInit) {
        this.getCurrentUserMessages();
      }
      this.isMessageInit = true
    }
  }




  getCurrentUserMessages() {
    let filter = { roomName: `${this.currentUser.slug}/&` }
    this.userService.getChatMessages(filter).subscribe((roomData: Array<any>) => {
      if (roomData && roomData.length > 0) {
        let messageData = [];
        roomData.forEach(elem => {
          if (elem.messages && elem.messages.length > 0) {
            let roomNameSplit = elem.roomName.split("&");
            let otherUserSlug = roomNameSplit[0] === this.currentUser.slug ? roomNameSplit[1] : roomNameSplit[0];
            let reverseArray = elem.messages.slice().reverse();
            let arr = reverseArray.find(elem => elem.userName !== this.currentUser.name);
            if(arr && arr.message){
              messageData.push(this.formatMessageData({ message: arr.message }, otherUserSlug));
            }
          }
        });
        this.pushNotification(messageData, "messanger", false);
      }
    })
  }

  onMessagesReceived(data) {
    let formattedMsgData = this.formatMessageData(data, data.slug)
    this.pushNotification(formattedMsgData, "messanger", true)
  }

  onNotifyUser(data) {
    console.log("notificationData", data)
    let formattedLikeData = this.formatLikeData(data._notifyingData)
    this.pushNotification(formattedLikeData, "notification", true)
  }

  formatLikeData(notificationData) {
    let title;
    if (notificationData.type === 'addLike') {
      title = `${notificationData.userData.name}  like your post "${notificationData.postContent.substr(0, 10)}..."`;
    } else if (notificationData.type === 'addComment') {
      title = `${notificationData.userData.name}  commented on your post "${notificationData.postContent.substr(0, 10)}..."`;
    }
    return {
      title,
      isTextType: true,
      imageURL: notificationData.userData.profilePic,
      subTitle: notificationData.userData.name,
      slug: notificationData.userData.slug
    }
  }

  formatMessageData(msgData, otherUserSlug) {
    let otherUser = this.allUsers.find(elem => elem.slug === otherUserSlug);
    return {
      title: msgData.message,
      isTextType: true,
      imageURL: otherUser.profilePic,
      subTitle: otherUser.name,
      slug: otherUser.slug,
      serviceName: 'redirect',
      redirectUrl: `../messages/${otherUser.slug}`
    }
  }

  pushNotification(notificationData, type, updateBadgeNotification) {
    let config = this.menuConfigs.find(elem => elem.name === type);

    if (config.list_options) {
      let ind = config.list_options.findIndex(elem => elem.slug === notificationData.slug)
      if (ind > -1) {
        config.list_options[ind].title = notificationData.title;
        if (config.badgeCount == 0) {
          config.badgeCount = 1;
        }
      } else {
        config.list_options.push(notificationData)
        config.badgeCount = config.badgeCount ? config.badgeCount + 1 : 1;
      }

    } else {
      config.list_options = Array.isArray(notificationData) ? [...notificationData] : [notificationData];
      if (config.list_options.length > 0) {
        config.badgeCount = config.list_options.length;
      }
    }

  }

}
