import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';


import { environment  } from '../../environments/environment'
import { map } from 'rxjs/internal/operators/map';
import { throwError } from 'rxjs/internal/observable/throwError';
import { GlobalErrorHandlerService } from 'src/app/service/global-error-handler.service';
import { Router } from '@angular/router';


import * as fromAuth from '../store/auth/auth.reducer';
import * as AuthAction from '../store/auth/auth.actions';
import { User } from 'src/app/models/user.model';

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

  private serverUrl:string = "";

  constructor(private httpService:HttpClient,private globalErrorHandler:GlobalErrorHandlerService,private router:Router,private store:Store<{authReducer:{user:User}}>) {
      this.serverUrl = environment.APIEndPoint + "users";
  }

  login(email:string,password:string){

     return this.httpService.post(`${this.serverUrl}/login`,{email,password})
            .pipe(catchError(this.globalErrorHandler.handleError),map(((resData:AuthResponseData)=>{
                let userObj  = {...resData.data.user};
                userObj['token'] = resData.data.token;
                return userObj;
            })), tap(resData=>{
               this.handletAuthentication(resData);
            }))
  }

  handletAuthentication(resData){
    this.store.dispatch(new AuthAction.Login(resData))
  }
}
