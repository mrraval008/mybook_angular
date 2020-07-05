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
  public _iconsClass=iconsClass

  constructor(private actionHandler:ActionHandlerService) { }

  ngOnInit() {
  }

  onDropdownItemClick(event,dropdownData){
    this.actionHandler.onFireAction(event,dropdownData)
  }
  onDropdownBadgeClick(){
    if(this.config.badgeCount > 0){
      this.config.badgeCount = 0;
    }
  }

}
