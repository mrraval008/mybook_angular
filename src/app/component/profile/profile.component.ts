import { Component, OnInit } from '@angular/core';

import { headerConfigs ,APIEndPoints } from '../../configs/config';
import { iconsClass } from '../../enums/enum';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user.model';
import { FileUploader } from 'ng2-file-upload';
import { UtilsService } from 'src/app/service/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  public icons = headerConfigs.icons;
  public _iconsClass = iconsClass;
  public menuConfigs = headerConfigs.menus;

  public isEditCoverPhoto: boolean = false;
  public isEditProfilePhoto: boolean = false;
  public userData: any;
  public isReadOnly = true;

  private authToken = this.utilService.getLocalStorageData('authToken');


  public profilePicUploader = new FileUploader({ autoUpload: true, allowedFileType: ["image"], headers: [{ name: 'authorization', value: 'Bearer ' + this.authToken }], itemAlias: 'profilePic' })
  public coverPicUploader = new FileUploader({ autoUpload: true, allowedFileType: ["image"], headers: [{ name: 'authorization', value: this.authToken }], itemAlias: 'coverPic' })



  constructor(private route: ActivatedRoute, private userService: UserService, private utilService: UtilsService) { }

  ngOnInit() {
    let _userData = this.userService.getCurrentUserData();

    this.route.params.subscribe(params => {
      let slug = params['slug'];
      if (_userData.slug === slug) {
        this.userData = _userData;
        this.isReadOnly = false;
      } else {
        this.userService.getUser(slug).subscribe(data => {
          this.userData = data[0];
        }, err => {

        })
      }
    })

    this.profilePicUploader.onAfterAddingFile = (file) => {
      this.isEditProfilePhoto = true;
      this.onAfterAddingFile(file);
    }

    this.coverPicUploader.onAfterAddingFile = (file) => {
      this.isEditCoverPhoto = true;
      this.onAfterAddingFile(file);
    }
    this.profilePicUploader.onCompleteItem = (item, response, status, headers) => {
      this.onAfterCompleteFile(item, response, status, headers);
    }

    this.coverPicUploader.onCompleteItem = (item, response, status, headers) => {
      this.onAfterCompleteFile(item, response, status, headers);
    }

    this.profilePicUploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('removedImages', this.userData.profilePic);
    };
    this.coverPicUploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('removedImages', this.userData.coverPic);
    };
  }


  onAfterAddingFile(file) {
    file.url = `${APIEndPoints.UserAPIEndPoint}/${this.userData.slug}`
    file.withCredentials = false;

  }

  onAfterCompleteFile(item, response, status, headers) {
    let _response = JSON.parse(response)
    if(_response.status == "success"){
        this.userData = _response.data;
        this.userService.setCurrentUserData(_response.data)
    }else{
      console.log("error")
    }
    this.isEditProfilePhoto = false;
    this.isEditCoverPhoto = false;
    console.log(item, response)
  }

  ngOnDestroy() {

  }
}
