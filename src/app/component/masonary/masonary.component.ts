import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-masonary',
  templateUrl: './masonary.component.html',
  styleUrls: ['./masonary.component.css']
})
export class MasonaryComponent implements OnInit {

  public showCarousel:boolean = false;
  @Input() images:[string];
  public activeIndex:number
  constructor() { }

  ngOnInit() {
  }

  onImageClick(event){
      this.activeIndex = event.target.id
      this.showCarousel = true
  }

}
