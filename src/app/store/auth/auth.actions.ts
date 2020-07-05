import { Action } from '@ngrx/store';



export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";


export class Login implements Action {
        readonly type = LOGIN;
        constructor(public payload:{  
            _id:String,
            name:string,
            email:string,
            profilePic:string,
            coverPic:string,
            slug:string,
            token:string,
            isOnline:string}){}
}


export class LogOut implements Action {
    readonly type = LOGOUT;
    constructor(){}
}

export type AuthActions =  Login | LogOut;