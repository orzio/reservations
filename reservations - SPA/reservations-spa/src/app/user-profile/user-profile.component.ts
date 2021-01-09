import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UpdateUser } from '../_models/UpdateUser';
import { Subscription } from 'rxjs';


export interface ChangePassword{
  userId:string;
  currentPassword:string;
  newPassword:string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit, OnDestroy {
  
  profileForm:FormGroup;
  passwordForm:FormGroup;
  editMode:boolean = false;
  currentUser:User;
  firstName:string="";
  lastName:string="";
  passwordChanged:boolean=false;
  userSubscription:Subscription;

  constructor(private activatedRoute: ActivatedRoute, private userService:UserService,
    private router: Router, private authService:AuthService) { }



  ngOnInit(): void {
    const _this = this;
   this.userSubscription = _this.authService.user.subscribe((user:User)=>{
     //console.log(user.name);
    _this.currentUser = user;
    _this.firstName = user?.name.split(' ')[0];
    _this.lastName = user.name.split(' ')[1];

    })
    //console.log(_this.firstName);
    //console.log(this.firstName);
    this.initProfileForm();
    this.initPasswordForm();
  }


  private initPasswordForm(){
    let currentPassword ='';
    let newPassword ='';
    let confirmPassword ='';

    this.passwordForm = new FormGroup({
      'currentPassword': new FormControl(currentPassword, Validators.required),
      'newPassword': new FormControl(newPassword, Validators.required),
      'confirmPassword': new FormControl(confirmPassword, Validators.required),
    }, {validators:this.checkPasswords})
  }


  checkPasswords(formGroup:FormGroup){
    let values = formGroup.value;
    let password = values['newPassword'];
    let confirmPassword =values['confirmPassword'];

    let resp = password === confirmPassword? null : {theSame:false};
    return resp;
  }
  
  private initProfileForm(){
    let firstName =this.firstName;
    let lastName =this.lastName;

    this.profileForm = new FormGroup({
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
    })
  }



  onSubmit(){
    let updatedUser:UpdateUser = this.profileForm.value;
    this.firstName = updatedUser.firstName;
    this.lastName = updatedUser.lastName;
    updatedUser.id=this.currentUser.id;
    //console.log("submitted");


    this.userService.updateUser(updatedUser).subscribe(
      ()=>{
        this.currentUser.name=`${this.firstName} ${this.lastName}`;
        this.authService.user.next(this.currentUser);
        this.authService.getNewToken();
        //console.log("::::::update user"+this.currentUser.name);
      }
    )
  }

  onSubmitPassword(){
    let changePassword:ChangePassword={
      userId :this.currentUser.id,
      currentPassword:this.passwordForm.get("currentPassword").value,
      newPassword:this.passwordForm.get("newPassword").value,
    }

    this.userService.changePassword(changePassword).subscribe(
      ()=>{
        this.passwordChanged = true;
      },
      error=>{
        //console.log(error.error);
      })

    // this.firstName = updatedUser.firstName;
    // this.lastName = updatedUser.lastName;
    // updatedUser.id=this.currentUser.id;
    // //console.log("submitted");


    // this.userService.updateUser(updatedUser).subscribe(
    //   ()=>{
    //     this.currentUser.name=`${this.firstName} ${this.lastName}`;
    //     this.authService.user.next(this.currentUser);
    //     this.authService.getNewToken();
    //     //console.log("::::::update user"+this.currentUser.name);
    //   }
    // )
  }
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }


}
