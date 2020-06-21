

import * as fromPost from '../store/post/post.reducer';
import * as fromAuth  from  '../store/auth/auth.reducer';
import * as fromUser from '../store/user/user.reducer';
import { ActionReducerMap } from '@ngrx/store/src/models';

export interface AppState{
    posts:fromPost.State,
    authUser:fromAuth.State,
    user:fromUser.State
}

export const appReducer:ActionReducerMap<AppState> = {
    posts:fromPost.postReducer,
    authUser:fromAuth.authReducer,
    user:fromUser.userReducer
}