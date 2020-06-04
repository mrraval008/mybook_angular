

import * as fromPost from '../store/post/post.reducer';
import * as fromAuth  from  '../store/auth/auth.reducer';
import { ActionReducerMap } from '@ngrx/store/src/models';

export interface AppState{
    posts:fromPost.State,
    auth:fromAuth.State
}

export const appReducer:ActionReducerMap<AppState> = {
    posts:fromPost.postReducer,
    auth:fromAuth.authReducer
}