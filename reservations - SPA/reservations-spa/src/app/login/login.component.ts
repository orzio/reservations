import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:any={};
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  login(){
    console.log("jestem w login");
    this.authService.login(this.model).subscribe(next =>{
      console.log(this.model);
    });

    
  }

  logout(){

  }

}
