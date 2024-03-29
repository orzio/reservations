import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { OfficeService } from 'src/app/_services/office.service';
import { Office } from 'src/app/_models/Office';
import { DataStorageService } from 'src/app/_repositories/offices-storage.service';

@Component({
  selector: 'app-office-edit',
  templateUrl: './office-edit.component.html',
  styleUrls: ['./office-edit.component.css']
})
export class OfficeEditComponent implements OnInit {

  officeId:string;
  id:number;
  editMode:boolean = false;

  officeForm:FormGroup;
  constructor(private activatedRoute: ActivatedRoute, private officeService:OfficeService,
    private router: Router, private dataStorageService:DataStorageService ) { 
    console.log(activatedRoute);
  }

  //w ng on init subskrybujemy ścieżkę po to, żeby zawsze sprawdzalo czy jestesmy w editmode czy nie
  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(
      (params:Params) =>{
    this.id = +params['id'];
    this.editMode = params['id']!=null;
    this.initForm();
      }
    )
  }

  onSubmit(){
    if(this.editMode){
     let updatedOffice:Office = this.officeForm.value;
      updatedOffice.id = this.officeId;
      this.officeService.updateOffice(this.id,updatedOffice);
    } else{

      this.officeService.addOffice(this.officeForm.value);
      this.dataStorageService.addSingleOffice();
    }
    this.onCancel();
  }
  private initForm(){
    let name ='';
    let city ='';
    let street='';
    let zipCode='';
    let description='';

    if(this.editMode){
      name = this.officeService.getOfficeById(this.id).name;
      city = this.officeService.getOfficeById(this.id).address.city;
      street = this.officeService.getOfficeById(this.id).address.street;
      zipCode = this.officeService.getOfficeById(this.id).address.zipCode;
      description = this.officeService.getOfficeById(this.id).description;
      this.officeId = this.officeService.getOfficeById(this.id).id;
    }

    this.officeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'description': new FormControl(description, Validators.required),

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



}
