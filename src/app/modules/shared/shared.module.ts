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
import { RouterModule } from '@angular/router';
import { UserProfileCardComponent } from 'src/app/component/user-profile-card/user-profile-card.component';
import { PostListComponent } from 'src/app/component/post-list/post-list.component';
import { LimitTextPipe } from 'src/app/pipe/limit-text.pipe';
import { TimeAgoPipe } from 'src/app/pipe/time-ago.pipe';
import { IconsModule } from 'src/app/modules/icons/icons.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { ClickOutsideModule } from 'ng-click-outside';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
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
    UserProfileCardComponent,
    PostListComponent,
    LimitTextPipe,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    RouterModule,
    IconsModule,
    PickerModule,
    ClickOutsideModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true
    }),
    ScrollingModule
  ],
  exports: [
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
    RouterModule,
    UserProfileCardComponent,
    PostListComponent,
    LimitTextPipe,
    TimeAgoPipe,
    ToastrModule,
    ScrollingModule
  ]
})
export class SharedModule { }
