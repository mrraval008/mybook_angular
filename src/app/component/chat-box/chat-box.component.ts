import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/app/service/websocket.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import { Store } from '@ngrx/store';
import * as fromApp from  '../../store/app.reducer';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  private otherUserData:User;
  private AllUser:User[] = [];
  private userData:User;
  private roomName:string;
  private isTyping:boolean;
  private messagesArray;
  private message:string
  private loadChat:boolean = false;
  public showEmojiPicker:boolean = false;
  
  constructor(private websocketService:WebsocketService,private route:ActivatedRoute,private userService:UserService,private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.userData = this.userService.getCurrentUserData();
    this.store.select('user').subscribe(data=>{
      if(data && data.user != null && data.user.length > 0 && this.AllUser.length == 0){
      this.AllUser = data.user;
        this.route.params.subscribe(params=>{
          let _slug = params['slug']
          this.otherUserData = this.AllUser.find((elem:User)=>elem.slug === _slug)
          this.getChatData();
        })
      }
    })
   
    this.websocketService.newMessageReceived().subscribe(this.onMessagesReceived.bind(this));
    this.websocketService.receivedTyping().subscribe(this.onTypingReceived.bind(this));
  }

  getChatData(){
    if(this.userData.slug < this.otherUserData.slug){
      this.roomName = this.userData.slug.concat(`&${this.otherUserData.slug}`);
    }else{
      this.roomName = this.otherUserData.slug.concat(`&${this.userData.slug}`);
    }
    let _chatData = {
      roomName:this.roomName,
      userName:this.userData.name,
      userId:this.userData._id
    }
    this.websocketService.joinRoom(_chatData);
    let filter = {roomName:this.roomName}
    this.userService.getChatMessages(filter).subscribe(chatRoomData=>{
      this.messagesArray = chatRoomData[0].messages;
      this.loadChat = true;
    },err=>{
    })
  }

  sendMessage(){
    const data = {
      roomName:this.roomName,
      userName:this.userData.name,
      message:this.message,
      messageTime: new Date(),
      slug:this.userData.slug,
      profilePic:this.userData.profilePic
    }


    this.websocketService.sendMessage(data);
    this.messagesArray.push(data)
    this.message = '';
  }

  typing(){
    let data = {
      roomName:this.roomName
    }
    this.websocketService.typing(data);
  }


  onMessagesReceived(data){
    console.log("on message", data);

    this.isTyping = false;
    this.messagesArray.push(data);
  }

  onTypingReceived(data){
    this.isTyping = data.isTyping;
    console.log("typinggggg");
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    const text = `${this.message || ''}${event.emoji.native}`;
    this.message = text;
  }
  
  onClickedOutside(){
    this.showEmojiPicker = false
  }


}
