import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Office } from 'src/app/_models/Office';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DeskService } from 'src/app/_services/desk.service';
import { OfficeService } from 'src/app/_services/office.service';
import { Desk } from 'src/app/_models/desk';

@Component({
  selector: 'app-desk-edit',
  templateUrl: './desk-edit.component.html',
  styleUrls: ['./desk-edit.component.css']
})
export class DeskEditComponent implements OnInit {

  deskGuid:string;
  deskId:number;
  deskForm:FormGroup;
  currentOffice:Office;
  officeId:number;

  constructor(private activatedRoute: ActivatedRoute, private deskService:DeskService, private officeService: OfficeService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe((params:Params) => {
      this.deskId=+params['deskId'];

      this.activatedRoute.parent.params.subscribe((params) =>{
        this.currentOffice = this.officeService.getOfficeById(params.id);
      })
      this.initForm();
    })
  }

  private initForm(){
    let name='';
    let seats=0;
    this.deskForm = new FormGroup({
      'name':new FormControl(name,Validators.required),
      'seats':new FormControl(seats,Validators.required),
    })
  }

  onSubmit(){
    let desk:Desk = this.deskForm.value;
    desk.officeId = this.currentOffice.id;
    desk.id = this.deskGuid;
    //console.log(desk);

      //console.log("nie editMode");
      this.deskService.addDesk(desk);
   
      this.onCancel();
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.activatedRoute});
  }

}
