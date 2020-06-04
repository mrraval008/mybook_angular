import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';
import { Event } from '@angular/router';

@Directive({
  selector: '[appHilightBackground]'
})
export class HilightBackgroundDirective {

  private defaultColor:string = "transparent";
  
  constructor(private elementRef:ElementRef<any>) {
    this.defaultColor = this.elementRef.nativeElement.style.getPropertyValue('background');
    
  }
  @HostBinding("style.background") backgroundColor:string = this.defaultColor;
  
  @HostListener('mouseenter') mouseover(eventData:Event){
    let color = getComputedStyle(this.elementRef.nativeElement).getPropertyValue("--third-color")
    this.backgroundColor = color;
  }
  @HostListener('mouseleave') mouseleave(eventData:Event){
    this.backgroundColor = this.defaultColor;
  }

}
