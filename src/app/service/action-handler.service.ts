import { Injectable } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import { Store } from '@ngrx/store';

import * as fromApp from  '../store/app.reducer';
import * as fromPostAction from '../store/post/post.actions'
import { GlobalService } from 'src/app/service/global.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActionHandlerService {

  constructor(private postService:PostService,private store:Store<fromApp.AppState>,private globalService:GlobalService,private authService:AuthService,private router:Router) { }

  onFireAction(event,actionData){
    
    if(actionData){
        switch(actionData.serviceName){
            case 'postService':{
              switch(actionData.actionName){
                  case 'update' :{
                    this.store.dispatch(new fromPostAction.StartEdit(actionData.id));
                    this.postService.firePostAction.next(actionData.actionName);
                    break;
                  }
                  
                  case 'delete':{
                    this.postService.firePostAction.next({actionName:actionData.actionName,id:actionData.id});
                    break;
                  }
                  case 'create':{
                    this.postService.firePostAction.next(actionData.actionName);
                    break;
                  }
              }
            }

          case 'globalService':{
            switch(actionData.actionName){
                case 'themeChange' :{
                    event.stopPropagation()
                    this.globalService.onThemeChanged(event)
                    break;
                }
            }
          }

          case 'authService':{
            switch(actionData.actionName){
                case 'logOut' :{
                    this.authService.logOut();
                    break;
                }
            }
          }
          case 'redirect':{
              if(actionData.redirectUrl){
                this.router.navigate([actionData.redirectUrl])
                break;
              }
          }
        }
    }

  }
}
