import { Component, OnInit, Input } from '@angular/core';

import { PostService } from 'src/app/service/post.service';

import { PostModel } from '../../models/post.model';

import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription, Observer } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute } from '@angular/router';
// import { ToastrService } from 'src/app/service/toastr.service';

import { ToastrService } from 'ngx-toastr';


import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  public isLoading: boolean = true;
  public posts;
  private storeSub:Subscription;
  private postServiceActionSub:Subscription;
  private postServiceSub:Subscription;
  public readOnly:boolean = true;
  @Input() filters:any;
  private pageNum = 0;
  private pageLimit = 10;

  // ds = new PostDataSource(this.postService,this.store);

  constructor(private postService: PostService, private store: Store<fromApp.AppState>,private userService:UserService,private route:ActivatedRoute,private toastService:ToastrService) { }
  
  ngOnInit() {
    let userData = this.userService.getCurrentUserData();
    this.route.params.subscribe(params=>{
        let slug = params['slug'];
        if(slug){
          if(userData.slug === slug){
            this.readOnly = false;
          }
        }else{
          this.readOnly = false;
        }
    })

    this.postServiceActionSub = this.postService.firePostAction.subscribe((actionData:any)=>{
      if(actionData.actionName == "delete"){
        this.deletePost(actionData.id);
      }
    })
  }

  getAllPosts() {
    this.postServiceSub = this.postService.getAllPosts(this.filters).subscribe(suc => {
      this.isLoading = false;
      this.storeSub = this.store.select('posts').subscribe((data) => {
        
        if(data && data.posts){
          let _posts = [...data.posts];
          _posts =  _posts.sort((a, b) => {
            return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
          });
          this.posts = _posts;
        }
      })
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

  ngOnDestroy(){
      if(this.storeSub){
        this.storeSub.unsubscribe()
      }
      if(this.postServiceActionSub){
        this.postServiceActionSub.unsubscribe()
      }
      if(this.postServiceSub){
        this.postServiceSub.unsubscribe()
      }
  }


  onScroll(){
    this.pageNum++;
    this.filters = {...this.filters,
      page:this.pageNum,
      limit:this.pageLimit
    }
    this.getAllPosts();
  }

}

// export class PostDataSource extends DataSource<PostModel | any>{
 
//   private initialData: any[] = [{"createdAt":"2020-06-14T07:11:05.000Z","modifiedAt":"2020-06-14T07:11:05.000Z","images":[],"_id":"5ee5cd8a268cd2c3ccf0d0f6","content":"post at 12:41","createdBy":{"profilePic":"https://mybookproject.s3.ap-south-1.amazonaws.com/users/1592124078458.jpeg","coverPic":"https://mybookproject.s3.ap-south-1.amazonaws.com/users/1592124116325.jpeg","isOnline":"true","active":true,"_id":"5ee5107d4baedda40c6bfbb3","name":"Deval Pathak","email":"deval@gmail.com","slug":"deval-pathak.70"},"likes":[],"comments":[{"modifiedAt":"2020-06-14T07:10:55.254Z","createdAt":"2020-06-14T07:10:55.254Z","_id":"5ee5ce67268cd2c3ccf0d0f7","content":"comment at 12:44","commentBy":{"profilePic":"https://mybookproject.s3.ap-south-1.amazonaws.com/users/1592124078458.jpeg","coverPic":"https://mybookproject.s3.ap-south-1.amazonaws.com/users/1592124116325.jpeg","isOnline":"true","active":true,"_id":"5ee5107d4baedda40c6bfbb3","name":"Deval Pathak","email":"deval@gmail.com","slug":"deval-pathak.70"},"commentOn":"5ee5cd8a268cd2c3ccf0d0f6","id":"5ee5ce67268cd2c3ccf0d0f7"},{"modifiedAt":"2020-06-14T07:17:43.613Z","createdAt":"2020-06-14T07:17:43.613Z","_id":"5ee5cf17268cd2c3ccf0d0f8","content":"comment at 12:47","commentBy":{"profilePic":"https://mybookproject.s3.ap-south-1.amazonaws.com/users/1592124078458.jpeg","coverPic":"https://mybookproject.s3.ap-south-1.amazonaws.com/users/1592124116325.jpeg","isOnline":"true","active":true,"_id":"5ee5107d4baedda40c6bfbb3","name":"Deval Pathak","email":"deval@gmail.com","slug":"deval-pathak.70"},"commentOn":"5ee5cd8a268cd2c3ccf0d0f6","id":"5ee5cf17268cd2c3ccf0d0f8"}],"id":"5ee5cd8a268cd2c3ccf0d0f6"}]
//   private dataStream = new BehaviorSubject<(PostModel | any)[]>(this.initialData)
//   private subscription = new Subscription();
//   private storeSub:Subscription;
//   public posts;
  
//   @Input() filters:any;
//   constructor(private postService:PostService,private store: Store<fromApp.AppState>){
//     super()
//   }

//   connect(collectionViewer:CollectionViewer):Observable<(PostModel | any)>{

//     this.subscription.add(collectionViewer.viewChange.subscribe(range=>{
//       console.log(range.start)
//       console.log(range.end);
//       this.postService.getAllPosts(this.filters).subscribe((data:any)=>{
//         this.storeSub = this.store.select('posts').subscribe((data) => {
//           if(data && data.posts){
//             this.formatDta(data.posts);
//             // this.posts = data.posts;
//           }
//         })
//       })
//     }))
//     return this.dataStream;
//   }

//   disconnect():void{
//     this.subscription.unsubscribe()
//   }

//   onScroll(){
//     console.log("onScroll")
//   }

//   formatDta(_body: PostModel[]): void {
//     this.dataStream.next(_body);
//   }



// }
