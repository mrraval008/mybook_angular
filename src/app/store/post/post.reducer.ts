import { PostModel } from '../../models/post.model';
import * as PostActions from '../post/post.actions';

export interface State{
    posts:PostModel[],
    editPost:PostModel,
    editPostIndex:any
}

const initialPost:State = {
    posts:[new PostModel("","","",[""],null,null)],
    editPost:null,
    editPostIndex:-1
} 


export function postReducer (
    state:State =  initialPost,
    action:PostActions.postActions
){
    switch(action.type){

        case PostActions.ADD_POST:
            return {
                ...state,
                posts : [...state.posts,action.payload]
            }

        case PostActions.ADD_POSTS:
            return {
                ...state,
                posts: [...action.payload]
            }

        case PostActions.UPDATE_POST:
            let updatedPost = state.posts[state.editPostIndex];
            updatedPost = { ...updatedPost,...action.payload }

            let allPosts = [...state.posts];
            allPosts[state.editPostIndex] = updatedPost;
            return {
                ...state,
                posts:allPosts
            }

        case PostActions.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((elem,index)=>{
                        return index != state.editPostIndex;
                })
            }
        
        case PostActions.START_EDIT:
            let id = action.payload;
            let editedItem = state.posts.find(post=>post._id === id);
            let editIndex = state.posts.findIndex(post=>post._id === id);
        return {
            ...state,
            editPost:editedItem,
            editPostIndex:editIndex
        }
        case PostActions.STOP_EDIT :
            return {
                ...state,
                editPost:null,
                editPostIndex:-1
            }
    }
     
}















// export interface State{
//     user:User
// }

// const initialState:State = {
//     user:null
// }


// export function authReducer(state=initialState,action:AuthActions.AuthActions){
//     switch(action.type){
//         case AuthActions.LOGIN : {
//             const user = new User(
//                 action.payload.name,
//                 action.payload.email,
//                 action.payload.profilePic,
//                 action.payload.coverPic,
//                 action.payload.slug,
//                 action.payload.token
//             )
//             return {
//                 ...state,
//                 user
//             }
//         };
//         default:return initialState
        
//     }
// }