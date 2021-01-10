import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ResetPasswordService } from '../_services/resetPasswrod.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private resetPasswordService: ResetPasswordService,
    private router:Router) { }
  isSend:boolean = false;
  error:string=null;
  model:any={};
  isLoading:boolean=false;
  ngOnInit(): void {

  }

  submit(){
    this.resetPasswordService.forgotPassword(this.model.email).subscribe(

      success=> {
        this.isSend= true;
        this.isLoading=true;
//after 5 seconds sets loading to false and redirect to home
        setTimeout(()=>{
          this.isLoading = false;
          this.router.navigate(['/']);
        },1000)
  },
    errorMessage => {
    this.error = errorMessage;
    this.isLoading = false;
  });

}

}
