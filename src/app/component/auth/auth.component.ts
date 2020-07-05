import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService , AuthResponseData } from 'src/app/service/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';


import * as fromApp from '../../store/app.reducer';
import * as AuthAction from '../../store/auth/auth.actions';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public isSignUpMode:boolean = false;
  public signInProcess:boolean = false;
  public signUpProcess:boolean = false;
  

  constructor(private authService:AuthService,private router:Router,private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select("authUser").subscribe(data=>{
      console.log(data)
    })
  }

  changeMode(){
    this.isSignUpMode = !this.isSignUpMode
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    let userData = {}
    userData = {
      email:form.value.email,
      password:form.value.password
    }
    let postRoute = 'logIn';
    if(this.isSignUpMode){
      this.signUpProcess = true;
      postRoute = 'signUp';
      userData = {
        name:form.value.name,
        email:form.value.signupEmail,
        password:form.value.signupPassword,
        confirmPassword:form.value.confirmPassword
      }
    }else{
      this.signInProcess = true;
    }
    this.authService.authenticate(userData,postRoute).subscribe(this.handleResponseSuccess.bind(this),this.handleResponseError.bind(this))
  }


  handleResponseSuccess(suc){
    this.signUpProcess = false;
    this.signInProcess = false;
    // this.router.navigate(['/home']);
  }
  handleResponseError(err){
    this.signUpProcess = false;
    this.signInProcess = false;
  }

}
