import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { User } from 'src/app/models/user.model';
import { catchError } from 'rxjs/internal/operators/catchError';
import { GlobalErrorHandlerService } from 'src/app/service/global-error-handler.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as userActions from '../store/user/user.actions';
import { take } from 'rxjs/internal/operators/take';
import { tap } from 'rxjs/internal/operators/tap';
import { UtilsService } from 'src/app/service/utils.service';


export interface ResponseData{
  status:String,
  data:User[]
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private serverUrl = environment.UserAPIEndPoint;
  private userData:User;
  constructor(private httpClient:HttpClient,private globalErrorhandler:GlobalErrorHandlerService,private store:Store<fromApp.AppState>,private utils:UtilsService) {
      // this.getOnlineUsers();
   }

  getCurrentUserData(){
    return this.userData;
  }

  setCurrentUserData(data){
      if(this.utils.isEmpty(this.userData) && !this.utils.isEmpty(data)){
        this.getOnlineUsers(data).subscribe(dat=>{

        })
      }
      this.userData = data;
  }

  getOnlineUsers(data){
    // const userData  = this.getCurrentUserData();
    let searchParams = new HttpParams();
    searchParams = searchParams.append('_id',`{"$ne":"${data._id}"}`)
    // searchParams = searchParams.append('isOnline','true');
    return this.httpClient.get(this.serverUrl,{params:searchParams}).pipe(
      map((data:ResponseData)=>{
          const _data = data.data
          return _data
        }),
      tap(data=>{
        this.handleOnlineUsersGet(data);
      }),
      catchError(err=> this.globalErrorhandler.handleError(err))
      )
  }


  getUser(slug){
    const _serverUrl = `${this.serverUrl}/${slug}`;
    return this.httpClient.get(_serverUrl).pipe(
        map((data:ResponseData)=>{
          return data.data;
        }),
        catchError(err =>  this.globalErrorhandler.handleError(err))
  )
}

  getChatMessages(filter){
      let  _serverUrl = `${this.serverUrl}/chatRooms`;
      let httpParams = new HttpParams();
      if(!this.utils.isEmpty(filter)){
        for(let key in filter){
          // httpParams = httpParams.append(key,`/${this.userData.slug}/i`);  // to find all roomname conatining current user slug
          httpParams = httpParams.append(key,filter[key]);  // to find all roomname conatining current user slug
        }
      }
      return this.httpClient.get(_serverUrl,{params:httpParams}).pipe(
        map((data:any)=>{
            return data.data;
        }),
        catchError(err => {
          return this.globalErrorhandler.handleError(err)
        })
      )
  }

  handleOnlineUsersGet(data){
    this.store.dispatch(new userActions.AddUsers(data))
  }
  
}
