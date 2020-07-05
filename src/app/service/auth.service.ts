import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';


import { APIEndPoints } from '../configs/config';

import { map } from 'rxjs/internal/operators/map';
import { throwError } from 'rxjs/internal/observable/throwError';
import { GlobalErrorHandlerService } from 'src/app/service/global-error-handler.service';
import { Router } from '@angular/router';


import * as fromApp from '../store/app.reducer';
import * as AuthAction from '../store/auth/auth.actions';



import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/service/utils.service';
import { UserService } from 'src/app/service/user.service';

interface UserData{
  active:string;
  _id:string;
  name:string;
  email:string;
  slug:string;
  token:string;
}

interface Data{
  user:UserData;
  token:string
}

export interface AuthResponseData{
  status:string;
  data:Data
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serverUrl:string = APIEndPoints.UserAPIEndPoint;

  constructor(private httpService:HttpClient,
              private globalErrorHandler:GlobalErrorHandlerService,
              private router:Router,
              private store:Store<fromApp.AppState>,
              private utils:UtilsService,
              private userService:UserService
            ) {
  }

  authenticate(userData,postRoute){
     return this.httpService.post(`${this.serverUrl}/${postRoute}`,userData)
            .pipe(
              map(((resData:AuthResponseData)=>{
                    let userObj  = {...resData.data.user};
                    userObj['token'] = resData.data.token;
                    this.utils.setLocaleStorageData({'authToken':resData.data.token})
                    return userObj;
                  })),
              tap(resData=>{
                  this.handletAuthentication(resData);
                }), 
              catchError(err=> {
                  return this.globalErrorHandler.handleError(err);
              })
            )
  }

  isLoggedIn(){
      const _serverUrl  = `${this.serverUrl}/isLoggedIn`;
      return this.httpService.get(_serverUrl)
  }


  logOut(){
      this.utils.removeLocalStorage('authToken');
      this.store.dispatch(new AuthAction.LogOut())
      this.router.navigate(['/auth']);
  }

  handletAuthentication(resData){
    this.router.navigate(['/home']);
    this.userService.setCurrentUserData(resData);
    this.store.dispatch(new AuthAction.Login(resData));
  }
}
