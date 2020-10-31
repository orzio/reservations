import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { OfficeService } from 'src/app/_services/office.service';
import { Office } from 'src/app/_models/Office';

@Component({
  selector: 'app-office-edit',
  templateUrl: './office-edit.component.html',
  styleUrls: ['./office-edit.component.css']
})
export class OfficeEditComponent implements OnInit {

  id:number;
  editMode:boolean = false;

  officeForm:FormGroup;
  constructor(private activatedRoute: ActivatedRoute, private officeService:OfficeService,
    private router: Router) { 
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
      this.officeService.updateOffice(this.id, this.officeForm.value);
    } else{
      this.officeService.addOffice(this.officeForm.value);
    }
    this.onCancel();
  }
  private initForm(){
    let officeName ='';
    let officeCity ='';
    let officeStreet='';
    let officeZipCode='';
    let officeDescription='';

    if(this.editMode){
      officeName = this.officeService.getOfficeById(this.id).officeName;
      officeCity = this.officeService.getOfficeById(this.id).officeCity;
      officeStreet = this.officeService.getOfficeById(this.id).officeStreet;
      officeZipCode = this.officeService.getOfficeById(this.id).officeZipCode;
      officeDescription = this.officeService.getOfficeById(this.id).officeDescription;
    }

    this.officeForm = new FormGroup({
      'officeName': new FormControl(officeName, Validators.required),
      'officeCity':new FormControl(officeCity, Validators.required),
      'officeStreet':new FormControl(officeStreet, Validators.required),
      'officeZipCode':new FormControl(officeZipCode, [Validators.pattern(/[0-9]{2}\-[0-9]{3}/), Validators.required]),
      'officeDescription': new FormControl(officeDescription, Validators.required)
    })
  }

  onCancel(){
    this.router.navigate(["../"],{relativeTo:this.activatedRoute});
  }



}
