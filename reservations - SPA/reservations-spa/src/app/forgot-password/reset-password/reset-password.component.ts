import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { stringify } from 'querystring';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from 'src/app/_models/ResetPassword';
import { ResetPasswordService } from 'src/app/_services/resetPasswrod.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm:FormGroup;
  reserSucces:boolean = false;
  error:string;
  passwordChanged:boolean = false;
  isLoading:boolean= false;

  constructor(private resetPasswordService:ResetPasswordService,
     private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm(){

    let password ='';
    let confirmPassword ='';

    this.resetPasswordForm = new FormGroup({
      'password': new FormControl(password, Validators.required),
      'confirmPassword':new FormControl(confirmPassword, [Validators.required])
    }, {validators:this.checkPasswords})
  }


  checkPasswords(formGroup:FormGroup){
    let values = formGroup.value;
    let password = values['password'];
    let confirmPassword =values['confirmPassword'];

    let resp = password === confirmPassword? null : {theSame:false};
    //console.log(resp);
    return resp;
  }
  
  submit(){
    //console.log(123123132312);
    let password = this.resetPasswordForm.value['password']; 
    let token = this.activatedRoute.snapshot.queryParams['token'];
   
    let command:ResetPassword={
                              NewPassword:password,
                              Token:token
                            };     

    this.resetPasswordService.resetPassword(command).subscribe(
      success=> {
        this.passwordChanged= true;
        this.isLoading=true;

//after 5 seconds sets loading to false and redirect to home
        setTimeout(()=>{
          this.isLoading = false;
          this.router.navigate(['/']);
        },5000)
  },errorMessage => {
    this.error = errorMessage;
    this.isLoading = false;
  },
  );

  }



}



