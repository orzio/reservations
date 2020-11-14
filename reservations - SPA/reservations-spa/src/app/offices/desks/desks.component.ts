import { Component, OnInit } from '@angular/core';
import { Office } from 'src/app/_models/Office';
import { ActivatedRoute, Params } from '@angular/router';
import { OfficeService } from 'src/app/_services/office.service';

@Component({
  selector: 'app-desks',
  templateUrl: './desks.component.html',
  styleUrls: ['./desks.component.css']
})
export class DesksComponent implements OnInit {

  currentOffice:Office;
  constructor(private activatedRoute:ActivatedRoute, private officeService:OfficeService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param:Params)=>{
      this.currentOffice = this.officeService.getOfficeById(param['id']);
    })
  }


}
