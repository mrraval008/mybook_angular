import  { User } from '../models/user.model';
import { LikeModel } from 'src/app/models/like.model';
import { commentModel } from 'src/app/models/comment.model';

export class PostModel {
    constructor(
        public content:string,
        public _id:string,
        public createdAt: string,
        public images:[string],
        public createdBy: User,
        public likes:LikeModel[],
        public comments:commentModel[]
    ){}
}


// import  { User } from '../models/user.model';

// export class Post {
//     public content:string;
//     public createdAt: string;
//     public images:[string];
//     public createdBy: User ;
//     public likedBy:User;


//     constructor(content:string,createdAt: string,images:[string],createdBy: User,likedBy:User
//     ){
//         this.content = content;
//         this.createdAt = createdAt;
//         this.images = images;
//         this.createdBy = createdBy;
//         this.likedBy = likedBy
//     }
// }