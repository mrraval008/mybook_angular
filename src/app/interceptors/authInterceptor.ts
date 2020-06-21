import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/service/utils.service';
import { tap } from 'rxjs/internal/operators/tap';
import { GlobalErrorHandlerService } from 'src/app/service/global-error-handler.service';
import { error } from '@angular/compiler/src/util';


@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    constructor(private utils:UtilsService,private globalErrorHandler:GlobalErrorHandlerService){

    }

    intercept(req:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>> {
        let authToken = this.utils.getLocalStorageData("authToken");
        let request = req.clone();
        if(authToken){
            authToken = 'Bearer '+ authToken;
            request = req.clone({
                setHeaders:{
                    'authorization':authToken
                }
            })
        }

        return next.handle(request).pipe(
            tap(event =>{
                if(event instanceof HttpResponse){
                }
            }
        ))
    }
}
