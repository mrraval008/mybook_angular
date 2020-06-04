import { Component, OnInit } from '@angular/core';

import { homeConfigs } from '../../configs/config'

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.css']
})
export class HomeSidebarComponent implements OnInit {

  public homeConfigs = homeConfigs;

  constructor() { }

  ngOnInit() {
  }

}
