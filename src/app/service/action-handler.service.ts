import { Injectable } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import { Store } from '@ngrx/store';

import * as fromApp from  '../store/app.reducer';
import * as fromPostAction from '../store/post/post.actions'

@Injectable({
  providedIn: 'root'
})
export class ActionHandlerService {

  constructor(private postService:PostService,private store:Store<fromApp.AppState>) { }

  onFireAction(actionData){
    
    if(actionData){
        switch(actionData.serviceName){
            case 'postService':{
              switch(actionData.actionName){
                  case 'update' :{
                    this.postService.firePostAction.next(actionData.actionName);
                  }
                  case 'delete':{
                    this.postService.firePostAction.next({actionName:actionData.actionName,id:actionData.id});
                  }
              }
            }
        }
    }

  }
}
