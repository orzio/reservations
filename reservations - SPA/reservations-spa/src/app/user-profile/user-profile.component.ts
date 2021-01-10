import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UpdatedUser } from '../_models/UpdatedUser';
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
  phoneNumber:string;
  email:string="";
  passwordChanged:boolean=false;
  userSubscription:Subscription;
  subscription:Subscription;

  constructor(private activatedRoute: ActivatedRoute, private userService:UserService,
    private router: Router, private authService:AuthService) { }



  ngOnInit(): void {
    let updatedUser:UpdatedUser;
    this.userSubscription = this.authService.user.subscribe((user:User)=>{
      this.currentUser = user;
    })

    

    this.subscription = this.userService.getUser(this.currentUser.id).subscribe((data :UpdatedUser) =>{
    console.log(data);
    updatedUser = data;
    //tutaj są dane 

    const {firstName, lastName, phoneNumber,email} = data;
    this.profileForm.setValue({firstName, lastName,phoneNumber,email})

    })


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
    console.log("init profil");
    let firstName =this.firstName;
    let lastName =this.lastName;
    let phoneNumber =this.phoneNumber;
    let email = this.email;

    this.profileForm = new FormGroup({
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'phoneNumber': new FormControl(phoneNumber, Validators.required),
      'email': new FormControl({value: email, disabled:true}, Validators.required),
    })
  }





  onSubmit(){
    let updatedUser:UpdatedUser = this.profileForm.value;
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

      })


  }
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.subscription?.unsubscribe();
  }


}
