import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any={};

  isLoading:boolean = false;
  error:string =null;
  constructor(private authService:AuthService,private router: Router) {
    this.model.Role = "user";
   }

  ngOnInit(): void {
  }

  register(){
    this.isLoading = true;
    this.authService.register(this.model).subscribe(() => {
      this.isLoading = false;
    },errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    },() =>{
      this.authService.login(this.model).subscribe(()=>{
        this.router.navigate(['/home']);
      })
    });
  }
}
