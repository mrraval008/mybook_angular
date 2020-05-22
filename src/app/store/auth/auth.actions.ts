import { Action } from '@ngrx/store';



export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";


export class Login implements Action {
        readonly type = LOGIN;
        constructor(public payload:{  
            name:string,
            email:string,
            profilePic:string,
            coverPic:string,
            slug:string,
            token:string}){}
}

export type AuthActions =  Login