import { Component, OnInit, Input } from '@angular/core';

import { iconsClass } from '../../enums/enum'
import { ActionHandlerService } from 'src/app/service/action-handler.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() config:any
  // public listOptions = this.config.list_options
  public _iconsClass=iconsClass

  constructor(private actionHandler:ActionHandlerService) { }

  ngOnInit() {
    // console.log("listOptions",this.listOptions)
  }

  onDropdownItemClick(event,dropdownData){
    this.actionHandler.onFireAction(event,dropdownData)
  }

}
