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
  public likeArray= [];
  public loveArray= [];
  public hahaArray= [];
  public wowArray= [];
  public sadArray= [];
  public angryArray= [];

  public noOfShare: number = 0;
  public noOfComments: number = 0;
  public postId: string
  public createdByConfig: object = {}
  public actionList: object = {}
  public postImages: [string] = [""]
  public commentsConfig = [];
  public isLoading: boolean = false;
  public likeType: string = "";
  private likeId = "";
  public currentUserName: String
  public createPostConfig: object
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
      postId: this.postId,
      isComment: true,
      isWriteCommentBox: true
    }
    this.createPostConfig = {
      imageURL: this.userData.profilePic,
      isInput: true,
      inputPlaceholder: `Whats on your mind , ${this.userData.name.split(" ")[0]}`
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
      // this.likeType = !this.likeType;
    }, err => {
    })
  }

  handleLikeClick(data) {
    let operation = "";
    let _likeType = data.target.id
    if (_likeType) {
      if(this.likeType){
        operation=  'update';
      }else{
        operation=  'create';
      }
    }else {
      if(this.likeType){
        operation=  'delete';
      }else{
        _likeType = 'like'
        operation=  'create';
      }
    }

    if(operation === 'create'){
      let reqData = {
        'likeType': _likeType,
        'likedOn': this.postId,
        'likedBy': this.userData._id
      }
      return this.likeService.createLike(reqData, this.postId); 
    }else if(operation === 'update'){
      let reqData = {
        'likeType': _likeType,
      }
      return this.likeService.updateLike(reqData, this.likeId,this.postId); 
    }else if(operation === 'delete'){
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

      if (this.postConfigs.comments && this.postConfigs.comments.length > 0) {
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
          profileUrl: `/profile/${createdBy.slug}`,
          messageUrl: `/messages/${createdBy.slug}`,
          profilePopOver: true,
          slug: createdBy.slug
        }
        if(createdBy.slug == this.userData.slug){
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
  }


  formatLikes() {
    // this.likeArray = this.postConfigs.likes.length;
    this.postConfigs.likes.forEach(element => {
      switch (element.likeType) {
        case 'like': {
          this.likeArray.push(element);
          break
        }
        case 'love': {
          this.loveArray.push(element);
          break
        }
        case 'wow': {
          this.wowArray.push(element);
          break
        }
        case 'haha': {
          this.hahaArray.push(element);
          break
        }
        case 'sad': {
          this.sadArray.push(element);
          break
        }
        case 'angry': {
          this.angryArray.push(element);
          break
        }
      }
    });
    let currentUserLikeIndex = this.postConfigs.likes.findIndex(elem => {
      if (elem.likedBy._id) {
        return elem.likedBy._id == this.userData._id;
      } else {
        return elem.likedBy == this.userData._id;
      }
    })
    // if (!this.utilService.isEmpty(currentUserLikeData)) {
    if (currentUserLikeIndex > -1) {
      let currentUserLikeData = this.postConfigs.likes[currentUserLikeIndex];
      this.likeType = currentUserLikeData.likeType;
      this.likeId = currentUserLikeData._id;
      this.currentUserName = this.userData.name;
      // this.postConfigs.likes[currentUserLikeIndex] = {...currentUserLikeData ,'name':this.userData.name};
    }
  }

  fomratComments() {
    this.noOfComments = this.postConfigs.comments.length;
    this.commentsConfig = this.postConfigs.comments.map((comm: any) => {
      let readOnly = true;
      let name = comm.commentBy.name;
      let commentById = comm.commentBy._id || comm.commentBy;
      let profilePic = "";
      if (this.userData._id === commentById) {
        readOnly = false;
        name = this.userData.name;
        profilePic = this.userData.profilePic;
      }
      return {
        title: name,
        isComment: true,
        isReadOnly: readOnly,
        imageURL: (comm.commentBy.profilePic || profilePic ||  "https://mybookproject.s3.ap-south-1.amazonaws.com/users/default.jpg"),
        comment: comm.content,
        timeStamp: comm.createdAt,
        postId: this.postId,
        commentId: comm._id,
        profileUrl: `/profile/${comm.commentBy.slug}`,
        messageUrl: `/messages/${comm.commentBy.slug}`,
        profilePopOver: true,
        slug: comm.commentBy.slug,
        alignTop: true
      }
    })
  }

}
