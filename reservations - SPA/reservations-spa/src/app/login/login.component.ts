import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
@ViewChild('f') loginForm :NgForm;
  
isLoggedIn:boolean = false;
isLoading:boolean = false;
error:string =null;

model:any={};
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    this.error = null;
    this.isLoading = true;
    this.authService.login(this.model).subscribe(next =>{
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

}
