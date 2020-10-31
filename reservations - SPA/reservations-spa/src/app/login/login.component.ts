import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
@ViewChild('f') loginForm :NgForm;
  model:any={};
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.loginForm);
    console.log("jestem w login");
    this.authService.login(this.model).subscribe(next =>{
      console.log(this.model);
    });

    
  }

  logout(){

  }

}
