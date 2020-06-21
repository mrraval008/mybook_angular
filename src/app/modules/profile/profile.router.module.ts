import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth-guard';
import { ProfileComponent } from 'src/app/component/profile/profile.component';
import { ProfileTimelineComponent } from 'src/app/component/profile-timeline/profile-timeline.component';
import { ProfilePhotosComponent } from 'src/app/component/profile-photos/profile-photos.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: ':slug',
        component: ProfileComponent,
        children: [
          {
            path: '',
            component: ProfileTimelineComponent
          },
          {
            path: '',
            component: ProfilePhotosComponent
          }
        ]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }



