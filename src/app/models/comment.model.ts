import { User } from 'src/app/models/user.model';

export class commentModel {
        constructor(
            _id:String,
            content:String,
            commentBy:User,
            commentOn:String,
            modifiedAt: String
        ){}
}