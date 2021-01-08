import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  model:any={};

  roles = new Map<string, string>();
  isLoading:boolean = false;
  error:string =null;
  selectedRole:string = "Klient";
  registerSubsctiption:Subscription;
  loginSubscription:Subscription;
  constructor(private authService:AuthService,private router: Router) {
    this.roles["Wystawca"]="manager",
    this.roles["Klient"]="user"
   }

   
   ngOnInit(): void {
  }
  
  register(){
    this.isLoading = true;
    
    this.model.Role = this.roles[this.selectedRole];
    this.registerSubsctiption= this.authService.register(this.model).subscribe(() => {
      this.isLoading = false;
    },errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    },() =>{
      this.loginSubscription = this.authService.login(this.model).subscribe(()=>{
        this.router.navigate(['/home']);
      })
    });
  }

  ngOnDestroy(): void {
    this.registerSubsctiption?.unsubscribe();
    this.loginSubscription?.unsubscribe();
  }
}
