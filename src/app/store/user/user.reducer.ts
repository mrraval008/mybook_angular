import { User } from 'src/app/models/user.model';
import * as userActions from './user.actions';


export interface State{
    user:User[]
}
const initialState:State= {
    user:null
}

export function userReducer(state:State=initialState,action:userActions.userActions){
        switch(action.type){
            case userActions.ADD_USER:{
                return {
                    ...state,
                    user: [...state.user,action.payload]
                }
            }

            case userActions.ADD_USERS:{
                return {
                    ...state,
                    user:[...action.payload]
                }
            }

            case userActions.REMOVE_USER:{
                let updatedUserIndex = state.user.findIndex((elem:User)=>elem._id === action.payload)
                let AllUser = [...state.user];
                let updatedUser = {...AllUser[updatedUserIndex],"isOnline":"false"}
                AllUser[updatedUserIndex] = updatedUser;
               
                return{
                    ...state,
                    user:[...AllUser]
                }
            }

            case userActions.UPDATE_USER:{
                let AllUser = [...state.user];
                if(state.user){
                    let updatedUserIndex = state.user.findIndex((elem:User)=>elem._id === action.payload)
                    let updatedUser = {...AllUser[updatedUserIndex],"isOnline":"true"}
                    AllUser[updatedUserIndex] = updatedUser;
                }
                return{
                    ...state,
                    user:[...AllUser]
                }
            }
            default:return state
            
        }
}