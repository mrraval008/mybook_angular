import { PostModel } from '../../models/post.model';
import * as PostActions from '../post/post.actions';

import { UtilsService } from '../../service/utils.service';
import { LikeModel } from 'src/app/models/like.model';

const utilService = new UtilsService();

export interface State{
    posts:PostModel[],
    editPost:PostModel,
    editPostIndex:any
}

const initialPost:State = {
    posts:null,
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
            let updatedPost = {...state.posts[state.editPostIndex]}
            if(!utilService.isEmpty(action.nestedPayload)){
                const nestedPayload = action.nestedPayload;
                if(updatedPost){
                    if(nestedPayload.addLike){
                        updatedPost.likes = [...updatedPost.likes,nestedPayload.data];
                    }else if(nestedPayload.removeLike){
                        updatedPost.likes = updatedPost.likes.filter((elem:any)=> elem._id !== nestedPayload.id);
                    }else if(nestedPayload.addComment){
                        updatedPost.comments = [...updatedPost.comments,nestedPayload.data]
                    }else if(nestedPayload.removeComment){
                        updatedPost.comments = updatedPost.comments.filter((elem:any)=> elem._id !== nestedPayload.id);
                    }else if(nestedPayload.updateComment){
                        let _updateCommentIndex = updatedPost.comments.findIndex((elem:any)=>elem._id === nestedPayload.data._id)
                        if(_updateCommentIndex > -1){
                            let updatedComment = { ...updatedPost.comments[_updateCommentIndex],...nestedPayload.data }
                            let allComments = [...updatedPost.comments];
                            allComments[_updateCommentIndex] = updatedComment;
                            updatedPost.comments = [...allComments];
                        }
                    }
                }
            }else{
            updatedPost = { ...updatedPost,...action.payload }
            }

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
        default:return state
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