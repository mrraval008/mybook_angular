import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from 'src/app/modules/home/home.router.module';
import { HomeComponent } from 'src/app/component/home/home.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HomeMainComponent } from 'src/app/component/home-main/home-main.component';
import { HomeSidebarComponent } from 'src/app/component/home-sidebar/home-sidebar.component';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    HomeComponent,
    HomeMainComponent,
    HomeSidebarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  exports:[
    ScrollingModule
  ]
})
export class HomeModule { }
