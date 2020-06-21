import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-profile-timeline',
  templateUrl: './profile-timeline.component.html',
  styleUrls: ['./profile-timeline.component.css']
})
export class ProfileTimelineComponent implements OnInit {

  public filters:any

  constructor(private route:ActivatedRoute,private userService:UserService){}

  ngOnInit() {
    let _userData = this.userService.getCurrentUserData();
    
        this.route.params.subscribe(params => {
          let slug = params['slug'];
          if (_userData.slug === slug) {
            this.filters = {'createdBy':_userData._id};
          } else {
            this.userService.getUser(slug).subscribe(data => {
              this.filters = {'createdBy':data[0]._id};
            }, err => {
            })
          }
        })
  }

}
