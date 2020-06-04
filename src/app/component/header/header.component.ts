import { Component, OnInit } from '@angular/core';

import { headerConfigs } from '../../configs/config';

import { iconsClass } from  '../../enums/enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public icons=headerConfigs.icons;
  public _iconsClass=iconsClass;
  public menuConfigs = headerConfigs.menus;

  constructor() { }

  ngOnInit() {
    
  }

}
