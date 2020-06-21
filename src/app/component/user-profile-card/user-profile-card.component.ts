import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.css']
})
export class UserProfileCardComponent implements OnInit {

  private currentUserData;
  @Input() public config:User;
  public isCurrentUser:boolean = false;

  constructor(private userService:UserService) { }

  ngOnInit() {
    console.log(this.config)
    this.currentUserData = this.userService.getCurrentUserData();
    if(this.currentUserData.slug === this.config.slug){
      this.isCurrentUser = true;
    }
  }

}
