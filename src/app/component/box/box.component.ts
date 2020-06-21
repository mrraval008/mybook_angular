import { Component, OnInit, Input } from '@angular/core';

import { iconsClass } from '../../enums/enum'
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { CommentService } from 'src/app/service/comment.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  @Input() config:any
  @Input() options:any
  @Input() isReadOnly:boolean = false;
  public showLoader:boolean = false;
  public isEditMode:boolean = false;
  public showProfilePopover:boolean = false;
  private popOverTimer;
  public charLimitLength = 40;
  public comment:string = (this.config && this.config.comment) || ""

  // public alignTop:boolean=false


  public _iconsClass=iconsClass;

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    const text = `${this.comment}${event.emoji.native}`;

    this.comment = text;
    // this.showEmojiPicker = false;
  }


  showEmojiPicker = false;

  constructor(private userService:UserService,private commentService:CommentService) { }

  private userData = this.userService.getCurrentUserData();

  
  ngOnInit() {
  }

  onComment(commentForm:NgForm){

    if(!commentForm.valid){
      return;
    }
    this.isReadOnly = true;
    this.showLoader = true;
    if(this.isEditMode){
      const _commentData = {
        content:commentForm.value.comment,
      }
      this.commentService.updateComment(_commentData,this.config.commentId,this.config.postId).subscribe(this.handleCommentResponseSuccess.bind(this),this.handleCommentResponseError.bind(this))
    }else{
      const _commentData = {
        content:commentForm.value.comment,
        commentBy:this.userData._id,
        commentOn:this.config.postId
      }
      this.commentService.createComment(_commentData,this.config.postId).subscribe(this.handleCommentResponseSuccess.bind(this),this.handleCommentResponseError.bind(this))
    }
  }

  deleteComment(){
    this.isReadOnly = false;
    this.showLoader = false;
    this.commentService.deleteComment(this.config.commentId,this.config.postId).subscribe(this.handleCommentResponseSuccess.bind(this),this.handleCommentResponseError.bind(this))
  }

  handleCommentResponseSuccess(data){
    this.isReadOnly = false;
    this.showLoader = false;
  }

  handleCommentResponseError(data){
    this.isReadOnly = false;
    this.showLoader = false;
  }

  onCommentClick(){
    if(!this.config.isReadOnly){
      this.isEditMode = true;
    }
  }

  onProfilePopover(){
    this.popOverTimer =  setTimeout(()=>{    //<<<---    using ()=> syntax
      this.showProfilePopover = true;
    }, 500);
  }

  HideProfilePopover(){
    clearTimeout(this.popOverTimer);
    this.showProfilePopover = false;
  }
  onClickedOutside(){
    this.showEmojiPicker = false
  }
}
