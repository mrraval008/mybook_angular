import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from 'src/app/component/auth/auth.component';


const routes: Routes = [
  {
    path:'auth',
    loadChildren:'./modules/auth/auth.module#AuthModule'
  },
  {
    path:'home',
    loadChildren:'./modules/home/home.module#HomeModule'
  },
  {
    path:'messages',
    loadChildren:'./modules/messages/messages.module#MessagesModule'
  },
  {
    path:'profile',
    loadChildren:'./modules/profile/profile.module#ProfileModule'
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  }
];

@NgModule({
  //load modules when initial module completely loaded
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
