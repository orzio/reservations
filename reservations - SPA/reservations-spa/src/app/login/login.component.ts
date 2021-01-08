import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
@ViewChild('f') loginForm :NgForm;
  
isLoggedIn:boolean = false;
isLoading:boolean = false;
error:string =null;

loginSubscription:Subscription;

model:any={};
  constructor(private authService:AuthService, private router:Router) { }


  ngOnInit(): void {
  }

  login(){
    this.error = null;
    this.isLoading = true;
    this.loginSubscription = this.authService.login(this.model).subscribe(next =>{
      this.isLoading=false;
      this.router.navigate(['/']);
    },
    errorMessage =>{
      this.error = errorMessage;
      this.isLoading=false; 
    });
  }


  onSwitchMode(){
    this.isLoggedIn =!this.isLoggedIn;
  }
  
  onForgotPassword(){
    this.router.navigate(['/forgotpassword']);
  }

  
  logout(){

  }
  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
