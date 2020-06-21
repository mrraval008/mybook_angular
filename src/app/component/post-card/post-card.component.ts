import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs'


import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { exhaustMap } from 'rxjs/internal/operators/exhaustMap';
import { LikeService } from 'src/app/service/like.service';
import { UserService } from 'src/app/service/user.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() isCreate: boolean = false
  @Input() postConfigs;

  public userData: User;
  public currentUserCommentConfig = {};
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
  public isLiked: boolean = false;
  private likeId = "";
  public currentUserName:String
  public createPostConfig:object
  public charLimitLength = 50;

  @ViewChild("likeButton", { static: false }) likeButton: ElementRef


  constructor(
    private store: Store<fromApp.AppState>,
    private likeService: LikeService,
    private userService: UserService,
    private utilService: UtilsService
  ) { }

  ngOnInit() {
    this.userData = this.userService.getCurrentUserData();
    this.formatPostData()
    this.currentUserCommentConfig = {
      imageURL: this.userData.profilePic,
      postId:this.postId,
      isComment:true,
      isWriteCommentBox : true
    }
    this.createPostConfig = {
      imageURL: this.userData.profilePic,
      isInput:true,
      inputPlaceholder:`Whats on your mind , ${this.userData.name.split(" ")[0]}`
    }
  }

  ngAfterViewInit() {
    if (!this.isCreate) {
      this.initilaizeClicks()
    }
  }

  initilaizeClicks() {
    fromEvent(this.likeButton.nativeElement, 'click').pipe(
      exhaustMap((event) => {
        return this.handleLikeClick(event)
      })
    ).subscribe(suc => {
      // this.isLiked = !this.isLiked;
    }, err => {
    })
  }

  handleLikeClick(data) {
    if (!this.isLiked) {
      let reqData = {
        'likeType': 'like',
        'likedOn': this.postId,
        'likedBy': '5ec002a17fda29007c7208fe'
      }
      return this.likeService.createLike(reqData,this.postId);
    } else {
      return this.likeService.deleteLike(this.likeId, this.postId)
    }
  }


  formatPostData() {
    if (this.postConfigs) {

      this.postContent = this.postConfigs.content;
      this.postId = this.postConfigs._id;
      if (this.postConfigs.images) {
        this.postImages = this.postConfigs.images;
      }

      if (this.postConfigs.likes && this.postConfigs.likes.length > 0) {
        this.formatLikes()
      }
      
      if(this.postConfigs.comments && this.postConfigs.comments.length > 0){
        this.fomratComments()
      }
  

      this.noOfShare = this.postConfigs.shareBy && this.postConfigs.shareBy.length > 0 ? this.postConfigs.shareBy.length : 0;

      if (this.postConfigs.createdBy) {   // top most portion of post card
        const createdBy = this.postConfigs.createdBy
        this.createdByConfig = {          // created by config
          title: createdBy.name,
          isTextType: true,
          imageURL: (createdBy.profilePic || 'https://mybookproject.s3.ap-south-1.amazonaws.com/users/default.jpg'),
          subTitle: this.postConfigs.createdAt,
          isSubtitleDateType: true,
          profileUrl:`/profile/${createdBy.slug}`,
          messageUrl:`/messages/${createdBy.slug}`,
          profilePopOver:true,
          slug:createdBy.slug
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
              serviceName: "postService",
              actionName: 'update',
              id: this.postId
            },
            {
              iconName: 'delete',
              title: "Delete Post",
              isPopup: true,
              isIcon: true,
              isTextType: true,
              serviceName: "postService",
              actionName: 'delete',
              id: this.postId
            }
          ]
        }

      }
    }
  }


  formatLikes(){
    this.noOfLikes = this.postConfigs.likes.length;
    let currentUserLikeIndex = this.postConfigs.likes.findIndex(elem => {
      if(elem.likedBy._id){
        return elem.likedBy._id == this.userData._id;
      }else{
        return elem.likedBy == this.userData._id;
      }
    })
    // if (!this.utilService.isEmpty(currentUserLikeData)) {
    if (currentUserLikeIndex > -1) {
      this.isLiked = true;
      let currentUserLikeData = this.postConfigs.likes[currentUserLikeIndex];
      this.likeId = currentUserLikeData._id;
      this.currentUserName = this.userData.name;
      // this.postConfigs.likes[currentUserLikeIndex] = {...currentUserLikeData ,'name':this.userData.name};
    }
  }

  fomratComments(){
    this.noOfComments = this.postConfigs.comments.length;
    this.commentsConfig = this.postConfigs.comments.map((comm:any) => {
    let readOnly = true;
    let name = comm.commentBy.name;
    let commentById = comm.commentBy._id || comm.commentBy;
    if(this.userData._id === commentById){
      readOnly  = false;
      name = this.userData.name
    }
      return {
        title: name,
        isComment: true,
        isReadOnly:readOnly,
        imageURL: (comm.commentBy.profilePic || "https://mybookproject.s3.ap-south-1.amazonaws.com/users/default.jpg"),
        comment: comm.content,
        timeStamp : comm.createdAt,
        postId:this.postId,
        commentId:comm._id,
        profileUrl:`/profile/${comm.commentBy.slug}`,
        messageUrl:`/messages/${comm.commentBy.slug}`,
        profilePopOver:true,
        slug:comm.commentBy.slug,
        alignTop:true
      }
    })
  }

}
