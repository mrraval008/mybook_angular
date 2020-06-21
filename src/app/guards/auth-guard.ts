import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import { take } from 'rxjs/internal/operators/take';
import { map } from 'rxjs/internal/operators/map';
import { UtilsService } from 'src/app/service/utils.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import * as AuthAction from '../store/auth/auth.actions';
import { User } from 'src/app/models/user.model';


export interface ResponseData{
    status:string;
    user:User
  }

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private store: Store<fromApp.AppState>,
        private utilService: UtilsService,
        private authService: AuthService,
        private userService: UserService
    ) {

    }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let token = this.utilService.getLocalStorageData('authToken')
        if(!token){
            this.router.navigate(['/auth']);
            return false;
        }
        if(!this.utilService.isEmpty(this.userService.getCurrentUserData())){
            return true;
        }
        if (token) {
            return this.authService.isLoggedIn().pipe(map((data:ResponseData) => {
                if (this.utilService.isEmpty(data.user)) {
                    this.router.navigate(['/auth'])
                    return false;
                }
                let userData = data.user;
                userData['token'] = token;
                this.userService.setCurrentUserData(userData);
                this.store.dispatch(new AuthAction.Login(userData));
                return true;
            }))
        }
    }
} 