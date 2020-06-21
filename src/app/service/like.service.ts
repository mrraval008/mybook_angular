import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/internal/operators/tap';
import { map } from 'rxjs/internal/operators/map';
import { LikeModel } from 'src/app/models/like.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as postActions from '../store/post/post.actions';
import { catchError } from 'rxjs/internal/operators/catchError';

export interface responseData {
  status: String,
  data: LikeModel
}

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private serverUrl = environment.LikeAPIEndPoint

  constructor(private httpClient: HttpClient, private store: Store<fromApp.AppState>) { }

  createLike(data,postId) {
    this.store.dispatch(new postActions.StartEdit(postId))
    return this.httpClient.post(this.serverUrl, data)
      .pipe(
        tap(data => {
          let _data = data;
          _data['addLike'] = true;
          this.handleLikeResponse(_data);
        }))
  }

  deleteLike(likeId,postId) {
    this.store.dispatch(new postActions.StartEdit(postId))
    let _serverUrl = `${this.serverUrl}/${likeId}`
    return this.httpClient.delete(_serverUrl).pipe(
      tap(data => {
      data['removeLike'] = true;
      data['id'] = likeId;
      this.handleLikeResponse(data);
    }))
  }

  handleLikeResponse(data) {
    this.store.dispatch(new postActions.UpdatePost([], data))
    this.store.dispatch(new postActions.StopEdit());
  }

  handleLikeResponseError(data){
    this.store.dispatch(new postActions.StopEdit());
  }
}
