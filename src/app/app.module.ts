import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import * as fromAuth from  './store/auth/auth.reducer'
import { authReducer } from './store/auth/auth.reducer';
import { HeaderComponent } from './component/header/header.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // StoreModule.forRoot(fromAuth.authReducer)
    StoreModule.forRoot({authReducer:authReducer}),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
