import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxComponent } from 'src/app/component/box/box.component';
import { ChatListComponent } from 'src/app/component/chat-list/chat-list.component';
import { PostCardComponent } from 'src/app/component/post-card/post-card.component';
import { SearchBarComponent } from 'src/app/component/search-bar/search-bar.component';


@NgModule({
  declarations: [BoxComponent, ChatListComponent,PostCardComponent,SearchBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BoxComponent,
    ChatListComponent,
    PostCardComponent,
    SearchBarComponent
  ]
})
export class SharedModule { }
