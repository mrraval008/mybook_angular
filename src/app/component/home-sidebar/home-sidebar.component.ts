import { Component, OnInit } from '@angular/core';

import { homeConfigs } from '../../configs/config'
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.css']
})
export class HomeSidebarComponent implements OnInit {

  public homeConfigs = homeConfigs;
  public userDataConfig: any;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('authUser').subscribe((data: any) => {
      if (data.authUser != null) {
        this.userDataConfig = {
          title: data.authUser.name,
          url: `../profile/${data.authUser.slug}`,
          isIcon: false,
          isTextType: true,
          imageURL: data.authUser.profilePic
        }
      }

    })
  }

}
