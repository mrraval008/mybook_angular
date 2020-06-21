import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MessagesRoutingModule } from 'src/app/modules/messages/messages.router.module';
import { MessagesComponent } from 'src/app/component/messages/messages.component';
import { ChatBoxComponent } from 'src/app/component/chat-box/chat-box.component';
import { FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ClickOutsideModule } from 'ng-click-outside';



@NgModule({
  declarations: [
    MessagesComponent,
    ChatBoxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MessagesRoutingModule,
    FormsModule,
    PickerModule,
    ClickOutsideModule
  ]
})
export class MessagesModule { }
