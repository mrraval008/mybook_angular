import { Action } from '@ngrx/store/src/models';
import { User } from 'src/app/models/user.model';


export const ADD_USER = "ADD_USER";
export const ADD_USERS = "ADD_USERS";
export const REMOVE_USER = "REMOVE_USER";
export const UPDATE_USER = "UPDATE_USER";


export class AddUser implements Action{
        readonly type = ADD_USER;
        constructor(public payload:User){}
}

export class AddUsers implements Action{
    readonly type = ADD_USERS;
    constructor(public payload:User[]){}
}


export class removeUser implements Action{
   readonly  type = REMOVE_USER;
   constructor(public payload:string) {}
}

export class updateUser implements Action{
    readonly type = UPDATE_USER;
    constructor(public payload:string){}
}

export type  userActions = AddUser | AddUsers | removeUser | updateUser;