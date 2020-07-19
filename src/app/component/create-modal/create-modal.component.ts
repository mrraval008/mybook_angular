import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { createConfig } from '../../configs/config'

import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/service/post.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { UtilsService } from 'src/app/service/utils.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css']
})
export class CreateModalComponent implements OnInit {

  public _createConfig = createConfig;
  public uploadedImagesPreview: any = [];
  public imagesUploader = new FileUploader({ autoUpload: false, allowedFileType: ['image'], itemAlias: 'uploadedImages' });
  public isLoading = false;
  public isEditMode = false;
  public originalImages = [];
  private removedImages = [];
  private postId: string;
  private updateSubscription:Subscription
  public showEmojiPicker:boolean = false;
  public post_content:string = "";
  public _placeholder:string = "Whats on your mind";
  public dialogTitle = "Create Post";


  @ViewChild('closeButton', { static: false }) closeButtonCompo: any;
  @ViewChild('openModalButton', { static: false }) openModalButton: any;

  @ViewChild('fileInput', { static: false }) fileInputElem: ElementRef;
  @ViewChild('postForm', { static: false }) postForm: NgForm

  constructor(private postService: PostService, private store: Store<fromApp.AppState>,private util:UtilsService,private toastService:ToastrService) { }

  ngOnInit() {
    this.store.select('authUser').subscribe(data=>{
      if(data.authUser){
        this._createConfig.title = data.authUser.name;
        this._createConfig.imageURL = data.authUser.profilePic;
        this._placeholder = `Whats on your mind , ${data.authUser.name.split(" ")[0]}`
      }
    })
    this.postService.firePostAction.subscribe(actionName => {
      if (actionName === 'update') {
        this.isEditMode = true;
        this.dialogTitle = "Update Post"
        this.onUpdatePost();
      }else if(actionName === 'create'){
        this.openModalButton.nativeElement.click();
      }
    })

    this.imagesUploader.onAfterAddingFile = (file) => {
      file["id"] = Math.floor((Math.random() * 100) + 1);
      this.showPreview(file);
    }

    $('#createModal').on('hidden.bs.modal', () =>{
      if(this.updateSubscription){
        this.updateSubscription.unsubscribe()
      }
    });
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    const text = `${this.post_content}${event.emoji.native}`;
    this.post_content = text;
  }

  onClickedOutside(event){
    this.showEmojiPicker = false
  }


  onUpdatePost() {
     this.uploadedImagesPreview = []
     this.updateSubscription = this.store.select('posts').subscribe(data => {
      if (data.editPostIndex > -1) {
        this.openModalButton.nativeElement.click();
        let images = data.editPost.images;
        this.postId = data.editPost._id;
        this.originalImages = images.slice()
        this.postForm.setValue({
          post_content: data.editPost.content
        })
        images.forEach(element => {
          this.uploadedImagesPreview.push({ "src": element as string, "imageId": element });
        });
      }
    })
  }

  getFiles(): FileLikeObject[] {
    return this.imagesUploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  removeFile(id) {
    let previewImageIndex = this.uploadedImagesPreview.findIndex(elem => elem.imageId == id)
    if (previewImageIndex > -1) {
      this.uploadedImagesPreview.splice(previewImageIndex, 1);
    }

    if (this.isEditMode && this.originalImages.indexOf(id) > -1) {
      this.removedImages.push(id)
      return;
    }

    let fileIndex = this.imagesUploader.queue.findIndex((elem: any) => elem.imageId == id);
    if (fileIndex > -1) {
      this.imagesUploader.queue.splice(fileIndex, 1);
    }
  }

  showPreview(event) {
    if (event._file) {
      let file = event._file;
      let reader = new FileReader()
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.uploadedImagesPreview.push({ "src": reader.result as string, "imageId": event.id });
      };
      reader.onerror = (error) => {
        console.log(error)
      }
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    let isDirty = false
    //in case of adding imojis form will be not get dirty
    if (form.dirty || this.post_content !== form.value.post_content) {
      isDirty = true;
    }
    this.isLoading = true;
    let postContent = form.value.post_content;

    const formData: any = new FormData();

    formData.append('content', postContent);
    const files = this.getFiles();
    if (files.length > 0) {
      isDirty = true
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i].rawFile, files[i]['name']);
      }
    }
    if (this.isEditMode) {
      if (this.removedImages.length > 0) {
        isDirty = true
        formData.append('removedImages', this.removedImages);
      }
      let retainedImages = this.originalImages.filter(img => this.removedImages.indexOf(img) == -1)
      if (retainedImages.length > 0) {
        formData.append('retainedImages', retainedImages);
      }
    }
    if (isDirty) {
      if (this.isEditMode) {
        this.postService.updatePost(this.postId, formData).subscribe(this.handleSuccess.bind(this),this.handleError.bind(this))
      } else {
        this.postService.createPost(formData).subscribe(this.handleSuccess.bind(this),this.handleError.bind(this))
      }
    } else {
      this.isLoading = false;
      this.toastService.info('No Changes to Save')
    }
  }

  handleSuccess(suc){
    this.isLoading = false;
    let text = "Awesome.... Post created Succesfully.";
    
    let type = 'success';
    if(this.isEditMode){
      text = "Awesome.... Post updated Succesfully."
    }
    this.toastService.info(text)
    // this.util.showToast(type,text);
    this.postForm.reset();
    this.uploadedImagesPreview = [];
    this.closeButtonCompo.nativeElement.click();  // to close modal
  }

  handleError(err){
    this.isLoading = false;
    let text = "Ooopss.... Unable to  create Post.";
    if(this.isEditMode){
      text = "Ooopss.... Unable to  update Post."
    }
    let type = 'danger';
    // this.util.showSuccess();
  }

  ngOnDestroy(){
    if(this.updateSubscription){
      this.updateSubscription.unsubscribe()
    }
  }

}





 // <!-- <input type="file" multiple name="image" id="fileInput"  class="invisible w-0" (change)="fileChangeEvent($event)" accept="image/x-png,image/gif,image/jpeg" /> -->

    // const files: Array<File> = this.filesToUpload;
  // filesToUpload:Array<File> = []

  // fileChangeEvent(event){
  //   this.filesToUpload = <Array<File>>event.target.files
  //   console.log(this.filesToUpload)
  // }