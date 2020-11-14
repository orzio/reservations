import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfficeService } from 'src/app/_services/office.service';
import { Office } from 'src/app/_models/Office';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {


  currentOffice:Office;
  constructor(private activatedRoute:ActivatedRoute, private officeService:OfficeService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param:Params)=>{
      this.currentOffice = this.officeService.getOfficeById(param['id']);
    })
  }

}
