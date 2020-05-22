import { User } from 'src/app/models/user.model';
import * as AuthActions from 'src/app/store/auth/auth.actions';

export interface State{
    user:User
}

const initialState:State = {
    user:null
}


export function authReducer(state=initialState,action:AuthActions.AuthActions){
    switch(action.type){
        case AuthActions.LOGIN : {
            const user = new User(
                action.payload.name,
                action.payload.email,
                action.payload.profilePic,
                action.payload.coverPic,
                action.payload.slug,
                action.payload.token
            )
            return {
                ...state,
                user
            }
        };
        default:return initialState
        
    }
}