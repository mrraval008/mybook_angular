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
  private isMessageInit :boolean = false

  constructor(private websocketService: WebsocketService, private userService: UserService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.websocketService.newMessageReceived().subscribe(this.onMessagesReceived.bind(this));
    
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

  initGetMessages(){
    if(this.currentUser && this.allUsers && this.allUsers.length > 0){
      if(!this.isMessageInit){
          this.getCurrentUserMessages();
      }
      this.isMessageInit = true
    }
  }




  getCurrentUserMessages() {
    let filter = {roomName:`${this.currentUser.slug}/&`}
    this.userService.getChatMessages(filter).subscribe((roomData:Array<any>) => {
      if (roomData && roomData.length > 0) {
        let messageData = [];
        roomData.forEach(elem => {
          if(elem.messages && elem.messages.length > 0){
            let roomNameSplit = elem.roomName.split("&");
            let otherUserSlug = roomNameSplit[0] === this.currentUser.slug ? roomNameSplit[1] : roomNameSplit[0];
            let message = elem.messages[elem.messages.length - 1].message;
            messageData.push(this.formatMessageData({message},otherUserSlug));
          }
        });
        this.pushMessageNotification(messageData);
      }
    })
  }

  // getCurrentUserMessages(){
  //   this.userService.getChatMessages('',true).pipe(concatMap(chatRoomData=>{
  //         this.store.select('user').subscribe(userData=>{
  //             if(chatRoomData){
  //               chatRoomData.forEach(element => {

  //               });
  //             }
  //         })
  //   }))
  // }

  onMessagesReceived(data) {
      let formattedMsgData = this.formatMessageData(data,data.slug)
      this.pushMessageNotification(formattedMsgData)
  }

  formatMessageData(msgData,otherUserSlug) {
    let otherUser = this.allUsers.find(elem => elem.slug === otherUserSlug);
    return {
        title: msgData.message,
        isTextType: true,
        imageURL: otherUser.profilePic,
        subTitle: otherUser.name,
        slug:otherUser.slug
    }
  }

  pushMessageNotification(msgData) {
    let messageConfig = this.menuConfigs.find(elem => elem.name === "messanger");
    
    if (messageConfig.list_options) {
      let ind = messageConfig.list_options.findIndex(elem=>elem.slug === msgData.slug)
      if(ind > -1){
        messageConfig.list_options[ind].title =  msgData.title;
      }else{
        messageConfig.list_options.push(msgData)
      }
    } else {
      messageConfig.list_options = msgData;
    }
  }

}
