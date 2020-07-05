import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { map } from 'rxjs/internal/operators/map';
import { LikeModel } from 'src/app/models/like.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as postActions from '../store/post/post.actions';
import { catchError } from 'rxjs/internal/operators/catchError';
import { WebsocketService } from 'src/app/service/websocket.service';
import { UserService } from 'src/app/service/user.service';
import { APIEndPoints } from '../configs/config';

export interface responseData {
  status: String,
  data: LikeModel
}

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private serverUrl = APIEndPoints.LikeAPIEndPoint

  constructor(private httpClient: HttpClient, private store: Store<fromApp.AppState>,private socketService:WebsocketService,private userService:UserService) { }

  createLike(data,postId) {
    this.store.dispatch(new postActions.StartEdit(postId))
    return this.httpClient.post(this.serverUrl, data)
      .pipe(
        tap(data => {
          let _data = data;
          _data['addLike'] = true;
          this.handleLikeResponse(_data,postId);
        }))
  }
  updateLike(data,likeId,postId){
    let _serverUrl = `${this.serverUrl}/${likeId}`
    this.store.dispatch(new postActions.StartEdit(postId))
    return this.httpClient.patch(_serverUrl,data)
      .pipe(
        tap(data => {
          let _data = data;
          _data['updateLike'] = true;
          this.handleLikeResponse(_data,postId);
        }))
  }

  deleteLike(likeId,postId) {
    this.store.dispatch(new postActions.StartEdit(postId))
    let _serverUrl = `${this.serverUrl}/${likeId}`
    return this.httpClient.delete(_serverUrl).pipe(
      tap(data => {
      data['removeLike'] = true;
      data['id'] = likeId;
      this.handleLikeResponse(data,postId);
    }))
  }

  handleLikeResponse(data,postId) {
    if(data.addLike){
      let userData = this.userService.getCurrentUserData();
      let notificationData = {
        userData,
        postId,
        type:'addLike'
      }
      this.socketService.notifyUser(notificationData)
    }
    this.store.dispatch(new postActions.UpdatePost([], data))
    this.store.dispatch(new postActions.StopEdit());
  }

  handleLikeResponseError(data){
    this.store.dispatch(new postActions.StopEdit());
  }
}
