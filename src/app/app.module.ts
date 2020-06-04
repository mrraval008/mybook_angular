import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import * as fromApp from  './store/app.reducer'
import { authReducer } from './store/auth/auth.reducer';
import { HeaderComponent } from './component/header/header.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AuthInterceptor } from 'src/app/interceptors/authInterceptor';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
        ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // StoreModule.forRoot({authReducer:authReducer}),
    StoreModule.forRoot(fromApp.appReducer),
    SharedModule
  ],
  providers: [
      {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true
      }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
