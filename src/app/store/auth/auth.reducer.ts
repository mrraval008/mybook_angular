import { User } from 'src/app/models/user.model';
import * as AuthActions from 'src/app/store/auth/auth.actions';

export interface State{
    authUser:User
}

const initialState:State = {
    authUser:null
}


export function authReducer(state=initialState,action:AuthActions.AuthActions){
    switch(action.type){
        case AuthActions.LOGIN : {
            const authUser = new User(
                action.payload._id,
                action.payload.name,
                action.payload.email,
                action.payload.profilePic,
                action.payload.coverPic,
                action.payload.slug,
                action.payload.token,
                action.payload.isOnline
            )
            return {
                ...state,
                authUser
            }
        }
        case AuthActions.LOGOUT: {
            return {
                ...state,
                authUser:null
            }
        }
        default:return state
        
    }
}