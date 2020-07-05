import { Component, OnInit, ViewChild, ElementRef, Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css']
})
export class InfiniteScrollComponent implements OnInit {

  @ViewChild("endPoint",{static:false}) endPoint:ElementRef;
  private observer:IntersectionObserver;
  @Output() scrolled = new EventEmitter();

  constructor(private host:ElementRef) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.observer = new IntersectionObserver(([entry])=>{
      entry.isIntersecting && this.scrolled.emit()
    })
    this.observer.observe(this.endPoint.nativeElement);
  }

  get element(){
    return this.host.nativeElement
  }

  ngOnDestroy(){
    this.observer.disconnect();
  }

}
