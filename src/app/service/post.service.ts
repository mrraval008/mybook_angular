import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'
import { catchError } from 'rxjs/internal/operators/catchError';
import { GlobalErrorHandlerService } from 'src/app/service/global-error-handler.service';
import { map } from 'rxjs/internal/operators/map';
import { Store } from '@ngrx/store';
import * as fromApp  from  '../store/app.reducer';
import * as PostAction from '../store/post/post.actions';
import { PostModel } from 'src/app/models/post.model';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { Subject } from 'rxjs/internal/Subject';

import * as fromPostAction from '../store/post/post.actions';

export interface postsResponse{
    data:PostModel[],
    status:string
}

@Injectable({
  providedIn: 'root'
})


export class PostService {

  private serverUrl:string = environment.PostAPIEndPoint;
  public firePostAction = new Subject();

  constructor(private httpService:HttpClient,private globalErrorService:GlobalErrorHandlerService,private store:Store<fromApp.AppState>) { }

  createPost(data){
    return this.httpService.post(this.serverUrl,data)
            .pipe(catchError(this.globalErrorService.handleError),
                  tap(data=>{this.handleCreatePost(data)}));
  }

  updatePost(id,data){
    this.store.dispatch(new fromPostAction.StartEdit(id));
    let _serverUrl = `${this.serverUrl}/${id}`;
    return this.httpService.patch(_serverUrl,data)
            .pipe(
                catchError(this.globalErrorService.handleError),
                tap(data=>{this.handleUpdatePost(data)}))
  }

  deletePost(id){
    this.store.dispatch(new fromPostAction.StartEdit(id));
    let _serverUrl = `${this.serverUrl}/${id}`;
    return this.httpService.delete(_serverUrl)
                    .pipe(
                      catchError(this.globalErrorService.handleError),
                      tap((data)=>{
                        console.log("Deleted")
                        this.handleDeletePost();
                    })
                    )
  }


  getAllPosts():Observable<PostModel[]>{
    return this.httpService.get<postsResponse>(this.serverUrl)
          .pipe(
              map((data:postsResponse)=>{
                let _posts = data.data;
                return _posts;
              }),
              tap((postData)=>{
                this.handleGetPosts(postData)
              }))
  }

  handleGetPosts(data){
    this.store.dispatch(new PostAction.AddPosts(data))
  }
  handleCreatePost(postData){
    this.store.dispatch(new PostAction.AddPost(postData.data));
  }
  handleUpdatePost(postData){
    this.store.dispatch(new PostAction.UpdatePost(postData.data))
    this.store.dispatch(new PostAction.StopEdit())
  }
  handleDeletePost() {
    this.store.dispatch(new fromPostAction.DeletePost());
    this.store.dispatch(new fromPostAction.StopEdit());
  }
}