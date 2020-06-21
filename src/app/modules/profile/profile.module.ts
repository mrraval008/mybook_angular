import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ProfileRoutingModule } from 'src/app/modules/profile/profile.router.module';
import { ProfileComponent } from 'src/app/component/profile/profile.component';
import { ProfileTimelineComponent } from 'src/app/component/profile-timeline/profile-timeline.component';
import { ProfilePhotosComponent } from 'src/app/component/profile-photos/profile-photos.component';
import { FileUploadModule } from 'ng2-file-upload';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileTimelineComponent,
    ProfilePhotosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    FileUploadModule
  ]
})
export class ProfileModule { }
