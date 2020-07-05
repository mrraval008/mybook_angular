import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-masonary',
  templateUrl: './masonary.component.html',
  styleUrls: ['./masonary.component.css']
})
export class MasonaryComponent implements OnInit {

  @Input() images = [];
  public activeIndex:number;
  constructor(private postService:PostService) { }

  ngOnInit() {
  }

  onImageClick(event){
    this.postService.carouselSub.next({images:this.images,activeIndex:event.target.id})
  }

}
