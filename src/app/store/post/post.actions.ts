import { Action } from '@ngrx/store/src/models';
import { PostModel } from 'src/app/models/post.model';



export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const START_EDIT= 'START_EDIT'
export const STOP_EDIT = 'STOP_EDIT'


export class AddPost implements Action {
    readonly type = ADD_POST;

    constructor(public payload:PostModel){
    }
}

export class AddPosts implements Action {
    readonly type = ADD_POSTS;
    constructor(public payload:PostModel[]){}
}

export class UpdatePost implements Action {
    readonly type = UPDATE_POST;
    constructor(public payload:any,public nestedPayload:any){

    }
}

export class DeletePost implements Action {
    readonly type = DELETE_POST;
    constructor(){}
}

export class StartEdit implements Action{
    readonly type = START_EDIT;
    constructor(public payload){}
}

export class StopEdit implements Action{
    readonly type = STOP_EDIT;
    constructor(){}
}


export type postActions = AddPost | AddPosts | UpdatePost | DeletePost | StartEdit |  StopEdit;













// import { Action } from '@ngrx/store';



// export const LOGIN = "LOGIN";
// export const LOGOUT = "LOGOUT";


// export class Login implements Action {
//         readonly type = LOGIN;
//         constructor(public payload:{  
//             name:string,
//             email:string,
//             profilePic:string,
//             coverPic:string,
//             slug:string,
//             token:string}){}
// }

// export type AuthActions =  Login