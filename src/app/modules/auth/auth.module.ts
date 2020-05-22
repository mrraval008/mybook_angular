import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from 'src/app/modules/auth/auth.router.module';
import { AuthComponent } from 'src/app/component/auth/auth.component';


import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
