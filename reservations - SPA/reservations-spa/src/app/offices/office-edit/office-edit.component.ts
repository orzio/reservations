import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { OfficeService } from 'src/app/_services/office.service';
import { Office } from 'src/app/_models/Office';
import { AuthService } from 'src/app/_services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-office-edit',
  templateUrl: './office-edit.component.html',
  styleUrls: ['./office-edit.component.css']
})
export class OfficeEditComponent implements OnInit, OnDestroy {

  officeId:string;
  id:string;
  editMode:boolean = false;

  subscription:Subscription;
  officeForm:FormGroup;
  constructor(private activatedRoute: ActivatedRoute, private officeService:OfficeService,
    private router: Router, private authService:AuthService) { 
    //console.log(activatedRoute);
  }


  //w ng on init subskrybujemy ścieżkę po to, żeby zawsze sprawdzalo czy jestesmy w editmode czy nie
  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(
      (params:Params) =>{
    this.id = params['id'];
    this.editMode = params['id']!=null;
    this.initForm();
      }
    )
  }

  onSubmit(){
    let updatedOffice:Office = this.officeForm.value;
    let userId;
   this.subscription =  this.authService.user.subscribe(user => {
      userId = user.id;
    })

    updatedOffice.userId= userId;
    if(this.editMode){
      updatedOffice.id = this.officeId;
      this.officeService.updateOffice(this.id,updatedOffice);
    } else{
      this.officeService.addOffice(updatedOffice);
    }
    this.onCancel();
  }
  private initForm(){
    let name ='';
    let city ='';
    let street='';
    let zipCode='';
    let description='';
    let email='';
    let phoneNumber='';

    if(this.editMode){
      name = this.officeService.getOfficeById(this.id).name;
      email = this.officeService.getOfficeById(this.id).email;
      phoneNumber = this.officeService.getOfficeById(this.id).phoneNumber;
      city = this.officeService.getOfficeById(this.id).address.city;
      street = this.officeService.getOfficeById(this.id).address.street;
      zipCode = this.officeService.getOfficeById(this.id).address.zipCode;
      description = this.officeService.getOfficeById(this.id).description;
      this.officeId = this.officeService.getOfficeById(this.id).id;
    }

    this.officeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'email': new FormControl(email, Validators.required),
      'description': new FormControl(description, Validators.required),
      'phoneNumber': new FormControl(phoneNumber, Validators.required),

      'address':new FormGroup({
        'city':new FormControl(city, Validators.required),
        'street':new FormControl(street, Validators.required),
        'zipCode':new FormControl(zipCode, [Validators.pattern(/[0-9]{2}\-[0-9]{3}/), Validators.required])
      })
    })


  }

  onCancel(){
    this.router.navigate(["../"],{relativeTo:this.activatedRoute});
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
   }



}
