import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxComponent } from 'src/app/component/box/box.component';
import { ChatListComponent } from 'src/app/component/chat-list/chat-list.component';
import { PostCardComponent } from 'src/app/component/post-card/post-card.component';
import { SearchBarComponent } from 'src/app/component/search-bar/search-bar.component';
import { DropdownComponent } from 'src/app/component/dropdown/dropdown.component';
import { CreateModalComponent } from 'src/app/component/create-modal/create-modal.component';
import { FormsModule } from '@angular/forms';
import { HilightBackgroundDirective } from 'src/app/directive/hilight-background.directive';
import { FileUploadModule } from 'ng2-file-upload';
import { CarouselComponent } from 'src/app/component/carousel/carousel.component';
import { MasonaryComponent } from 'src/app/component/masonary/masonary.component';
import { LoaderComponent } from 'src/app/component/loader/loader.component';


@NgModule({
  declarations: [
    BoxComponent, 
    ChatListComponent,
    PostCardComponent,
    SearchBarComponent,
    DropdownComponent,
    CreateModalComponent,
    HilightBackgroundDirective,
    CarouselComponent,
    MasonaryComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule
  ],
  exports:[
    BoxComponent,
    ChatListComponent,
    PostCardComponent,
    SearchBarComponent,
    DropdownComponent,
    CreateModalComponent,
    HilightBackgroundDirective,
    CarouselComponent,
    MasonaryComponent,
    LoaderComponent,
    
  ]
})
export class SharedModule { }
