import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from 'src/app/component/messages/messages.component';
import { AuthGuard } from 'src/app/guards/auth-guard';


const routes: Routes = [
  {
    path:'',
    canActivate:[AuthGuard],
    children: [
      {
        path:':slug',
        component:MessagesComponent
    },
  ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }



