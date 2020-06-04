import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';

import { PostModel } from '../../models/post.model';

import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {

  private isLoading: boolean = true;
  public posts;
  private closeSub:Subscription

  constructor(private postService: PostService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.getAllPosts();
    this.store.select('posts').subscribe((data) => {
      if(data && data.posts){
        this.posts = data.posts;
      }
    })

    this.postService.firePostAction.subscribe((actionData:any)=>{
      if(actionData.actionName == "delete"){
        this.deletePost(actionData.id);
      }
    })
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(suc => {
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    })
  }

  deletePost(id){
    this.isLoading = true;
    this.postService.deletePost(id).subscribe(suc=>{
      this.isLoading = false;
    },err=>{
      this.isLoading = false;
    })
  }


}
