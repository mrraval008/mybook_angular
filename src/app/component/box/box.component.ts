import { Component, OnInit, Input } from '@angular/core';

import { iconsClass } from '../../enums/enum'

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  @Input() config:any
  @Input() options:any
  @Input() isReadOnly:boolean = false;
  // public alignTop:boolean=false
  public _iconsClass=iconsClass;

  constructor() { }

  ngOnInit() {
  }

}
