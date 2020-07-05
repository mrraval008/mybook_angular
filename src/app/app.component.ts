import { Component } from '@angular/core';
import { WebsocketService } from './service/websocket.service'
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  public isUserLoggedIn:boolean = false;
  constructor(private websocketService:WebsocketService,private store:Store<fromApp.AppState>) { }

  ngOnInit(){
    this.store.select('authUser').subscribe(data=>{
        if(data.authUser){
          this.isUserLoggedIn = true;
          let _roomData = {
            roomName: data.authUser._id,
            userName:data.authUser.name,
            userId:data.authUser._id,
            isInitialJoin:true
          }
          this.websocketService.joinRoom(_roomData)
        }else{
          this.isUserLoggedIn = false;
        }
    })
  }
}
