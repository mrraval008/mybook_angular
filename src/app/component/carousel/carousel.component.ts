import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/service/post.service';


declare var $: any;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  public images:[string];
  public activeIndex:number;
  constructor(private postService:PostService) { }

  ngOnInit() {
    this.postService.carouselSub.subscribe(data=>{
      this.images = data.images;
      this.activeIndex = data.activeIndex;
    })
  }
}
