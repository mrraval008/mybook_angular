import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService , AuthResponseData } from 'src/app/service/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';


import * as fromAuth from '../../store/auth/auth.reducer';
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
  

  constructor(private authService:AuthService,private router:Router,private store:Store<{authReducer:{user:User}}>) { }

  ngOnInit() {
    this.store.select("authReducer").subscribe(data=>{
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

    const {email,password} = form.value;

    let authObs: Observable<any>;

    authObs = this.authService.login(email,password)

    authObs.subscribe(resp=>{
        this.router.navigate(['/']);
    },err=>{
      console.log("error",err)
    })

  }

}
