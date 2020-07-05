import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer' 
import * as postAction from '../store/post/post.actions';
import { catchError } from 'rxjs/internal/operators/catchError';
import { commentModel } from 'src/app/models/comment.model';
import { UserService } from 'src/app/service/user.service';
import { WebsocketService } from 'src/app/service/websocket.service';
import { APIEndPoints } from '../configs/config';


export interface responseData {
  status: String,
  data: commentModel
}


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private serverUrl = APIEndPoints.CommentsAPIEndPoint;

  constructor(private httpClient:HttpClient,private store:Store<fromApp.AppState>,private userService:UserService,private socketService:WebsocketService) { }


  createComment(data,postId){
    data['createdAt']= new Date();
    data['modifiedAt'] = new Date();
    this.store.dispatch(new postAction.StartEdit(postId))
    return this.httpClient.post(this.serverUrl,data)
                  .pipe(
                    tap(data=>{
                    let _data = data;
                    _data['addComment'] = true;
                    this.handleCommentResponseSuccess(_data,postId)
                  }))
  }

  deleteComment(commentId,postId){
    this.store.dispatch(new postAction.StartEdit(postId))
    const _servserUrl = `${this.serverUrl}/${commentId}`
    return this.httpClient.delete(_servserUrl).pipe(
      tap(data => {
      data['removeComment'] = true;
      data['id'] = commentId;
      this.handleCommentResponseSuccess(data,postId);
    }))
  }

  updateComment(data,commentId,postId){
    data['modifiedAt'] = new Date();
    this.store.dispatch(new postAction.StartEdit(postId))
    const _serverurl = `${this.serverUrl}/${commentId}`
    return this.httpClient.patch(_serverurl, data)
          .pipe(
              tap((data)=>{
                let _data = data;
                _data['updateComment'] = true;
                this.handleCommentResponseSuccess(_data,postId)
              })
          )    
  }


  handleCommentResponseSuccess(data,postId){
    if(data.addComment){
      let userData = this.userService.getCurrentUserData();
      let notificationData = {
        userData,
        postId,
        type:'addComment'
      }
      this.socketService.notifyUser(notificationData)
    }
    this.store.dispatch(new postAction.UpdatePost([],data))
    this.store.dispatch(new postAction.StopEdit());
  }

  handleCommentResponseError(){
    this.store.dispatch(new postAction.StopEdit());
  }
}
