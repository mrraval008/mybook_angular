import { User } from 'src/app/models/user.model';

export class LikeModel {
        constructor(
            _id:String,
            likeType:String,
            likedBy:User,
            likedOn:String
        ){}
}