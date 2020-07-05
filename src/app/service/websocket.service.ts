import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import * as userActions from '../store/user/user.actions'

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket = io('/',{
    secure:true,
    rejectUnauthorized: false,
    path: '/chat/socket.io'
  })

  constructor(private userService: UserService, private store: Store,private toastService:ToastrService) {
    const userData = this.userService.getCurrentUserData();
    this.initializeSocketListener()
    // this.joinRoom(userData)
  }


  joinRoom(data) {
    this.socket.emit('join', data);
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }
  notifyUser(notificationData){
    this.socket.emit('notifyUser',notificationData)
  }

  initializeSocketListener(){
    this.userJoin();
    this.userLeft();
    this.onNotifyUser
  }


  newMessageReceived() {
    const observable = new Observable<{ data: object, isTyping: boolean }>(observer => {
      // const observable = new Subject<{ data: object, isTyping: boolean }>(observer => {
        
      this.socket.on('on-message', data => {
        this.toastService.info(`${data.userName} : ${data.message}`,'New Message') 
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }

  typing(data) {
    this.socket.emit('typing', data);
  }

  onNotifyUser(){
    const observable = new Observable<{ data: object }>(observer => {
      this.socket.on('onNotifyUser', data => {
        console.log(data)
        if(data._notifyingData.type === 'addLike'){
          this.toastService.info(`${data._notifyingData.userData.name}  like your post "${data._notifyingData.postContent.substr(0,10)}..."`,'Notification') 
        }else if(data._notifyingData.type === 'addComment'){
          this.toastService.info(`${data._notifyingData.userData.name}  commented on your post "${data._notifyingData.postContent.substr(0,10)}..."`,'Notification') 
        }
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }


  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean }>(observer => {
      this.socket.on('typing', data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }


  userJoin() {
    this.socket.on('on-user-join', data => {
      this.store.dispatch(new userActions.updateUser(data.data.userId))
    })
  }

  userLeft() {
    this.socket.on('on-user-left', data => {
      this.store.dispatch(new userActions.removeUser(data.data.userId))
    })

  }
}
