import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs'


import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { exhaustMap } from 'rxjs/internal/operators/exhaustMap';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() isCreate: boolean = false
  @Input() postConfigs;

  public userData
  public currentUserConfg = {};
  public postContent: string;
  public noOfLikes: number = 0;
  public noOfShare: number = 0;
  public noOfComments: number = 0;
  public postId: string
  public createdByConfig: object = {}
  public actionList: object = {}
  public postImages: [string] = [""]
  public commentsConfig = [];
  private isLoading: boolean = false;
  public isLiked:boolean = false;

  @ViewChild('likeButton',{static:false})likeButton:ElementRef


  constructor(
    private store: Store<fromApp.AppState>,
    private postService: PostService
  ) { }

  ngOnInit() {
    console.log("init")
    this.formatPostData()
    
    this.store.select('auth').subscribe(data => {
      this.userData = data;
      if (this.userData && this.userData.user) {
        this.currentUserConfg = {
          isInput: true,
          imageURL: `${environment.UserS3ImagerBseeURL}/${data.user.profilePic || 'default.jpg'}`,
        }
      } else {
        this.currentUserConfg = {
          isInput: true,
          imageURL: `${environment.UserS3ImagerBseeURL}/default.jpg`,
        }
      }
    })

    this.initilaizeClicks()

   
  }


  initilaizeClicks(){
    // fromEvent(this.likeButton.nativeElement,'click').pipe(
    //     exhaustMap(()=>{
    //         this.handledLikeClick()
    //     })
    // ).subscribe(suc=>{

    // },err=>{

    // })
  }

  handledLikeClick(){
    // if(!this.isLiked){
    //   let reqData = {
    //     'likeType':'like',

    //   }
    //   return this.postService.updatePost(this.postId,{'likedBy'})
    // }else{
    //     return this.postService.dele
    // }
    // this.isLiked = !this.isLiked
    
  }


  formatPostData() {
    if (this.postConfigs) {
      this.postContent = this.postConfigs.content;
      this.noOfLikes = this.postConfigs.likedBy && this.postConfigs.likedBy.length > 0 ? this.postConfigs.likedBy.length : 0;
      this.noOfShare = this.postConfigs.shareBy && this.postConfigs.shareBy.length > 0 ? this.postConfigs.shareBy.length : 0;
      this.noOfComments = this.postConfigs.commentBy && this.postConfigs.commentBy.length > 0 ? this.postConfigs.commentBy.length : 0;
      this.postId = this.postConfigs._id;
      if(this.postConfigs.images){
        this.postImages = this.postConfigs.images;
      }
      if (this.postConfigs.createdBy) {
        this.createdByConfig = {          // created by config
          title: this.postConfigs.createdBy.name,
          isTextType: true,
          imageURL: `${environment.UserS3ImagerBseeURL}/${this.postConfigs.createdBy.profilePic || 'default.jpg'}`,
          subTitle: this.postConfigs.createdAt,
          isSubtitleDateType: true
        }
        this.actionList = {
          name: "option",
          iconName: "three_dots",
          list_options: [
            {
              iconName: 'edit',
              title: "Edit Post",
              url: '',
              isPopup: true,
              isIcon: true,
              isTextType: true,
              serviceName:"postService",
              actionName:'update',
              id:this.postId
            },
            {
              iconName: 'delete',
              title: "Delete Post",
              isPopup: true,
              isIcon: true,
              isTextType: true,
              serviceName:"postService",
              actionName:'delete',
              id:this.postId
            }
          ]
        }

      }

      if (this.postConfigs.commentBy && this.postConfigs.commentBy.length > 0) {                   //comments
        this.commentsConfig = this.postConfigs.commentBy.map(comm => {
          return {
            title: comm.commentBy.name,
            isComment: true,
            imageURL: `environment.PostsS3ImageBaseURL/${comm.commentBy.profilePic}`,
            comment: comm.commentContent
          }
        })
      }

    }
  }
  


 
}
