import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { APIEndPoints } from '../configs/config';
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
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface postsResponse{
    data:PostModel[],
    status:string
}

@Injectable({
  providedIn: 'root'
})


export class PostService {

  private serverUrl:string = APIEndPoints.PostAPIEndPoint;
  public firePostAction = new Subject();
  public carouselSub = new BehaviorSubject<any>({});

  constructor(private httpService:HttpClient,private globalErrorService:GlobalErrorHandlerService,private store:Store<fromApp.AppState>) { }

  createPost(data){
    data.append('createdAt',new Date());
    data.append('modifiedAt',new Date());
    return this.httpService.post(this.serverUrl,data)
            .pipe(catchError(this.globalErrorService.handleError),
                  tap(data=>{this.handleCreatePost(data)}));
  }
  updatePost(id,data){
    let _serverUrl = `${this.serverUrl}/${id}`;
    data.append('modifiedAt',new Date())
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


  getAllPosts(filters):Observable<PostModel[]>{
    let httpParams = new HttpParams();
    let _filter = {sort : '-modifiedAt'};
    let initialGet = false;
    if(filters && filters.page == 1){
      initialGet = true;
    }
    if(filters){
      _filter = { ..._filter,...filters}
    }
    for(let key in _filter){
      httpParams = httpParams.set(key,_filter[key]);
    }
    return this.httpService.get<postsResponse>(this.serverUrl,{params:httpParams})
          .pipe(
              map((data:postsResponse)=>{
                let _posts = data.data;
                return _posts;
              }),
              tap((postData)=>{
                this.handleGetPosts(postData,initialGet)
              }))
  }

  handleGetPosts(data,initialGet){
    this.store.dispatch(new PostAction.AddPosts(data,initialGet))
  }
  handleCreatePost(postData){
    this.store.dispatch(new PostAction.AddPost(postData.data));
  }
  handleUpdatePost(postData){
    this.store.dispatch(new PostAction.UpdatePost(postData.data,""))
    this.store.dispatch(new PostAction.StopEdit())
  }
  handleDeletePost() {
    this.store.dispatch(new fromPostAction.DeletePost());
    this.store.dispatch(new fromPostAction.StopEdit());
  }
}
