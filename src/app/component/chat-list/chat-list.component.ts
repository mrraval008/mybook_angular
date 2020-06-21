import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  public userListConfig; 
  private userData:User[];
  constructor(private userService:UserService,private store:Store<fromApp.AppState>,private utilService:UtilsService) { }

  ngOnInit() {
    this.store.select('user').subscribe(data=>{
      if(data && data.user != null && !this.utilService.isEmpty(data.user)){
        let _userData = data.user.filter((elem:User)=> elem.isOnline == "true" )
        this.userData = _userData;
        this.formatUserData(_userData)
      }
    })
    // this.getOnlineUsers()
    
  }


  // getOnlineUsers(){
  //     this.userService.getOnlineUsers().subscribe(data=>{

  //     },err=>{

  //     })
  // }

  formatUserData(data){
    this.userListConfig = data.map(elem=>{
      return {
        title: elem.name,
        slug:elem.slug,
        isTextType: true,
        isChat:true,
        imageURL: elem.profilePic,
      }
    
    })
  }




}
