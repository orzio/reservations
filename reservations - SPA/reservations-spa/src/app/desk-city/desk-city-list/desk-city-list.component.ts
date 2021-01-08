import { Component, OnInit, OnDestroy } from '@angular/core';
import { OfficeService } from 'src/app/_services/office.service';
import { Office } from 'src/app/_models/Office';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desk-city-list',
  templateUrl: './desk-city-list.component.html',
  styleUrls: ['./desk-city-list.component.css']
})
export class DeskCityListComponent implements OnInit, OnDestroy {

  offices:Office[]=[];
  subscription:Subscription;
    
  constructor(private officeService:OfficeService, 
    private router:Router) { }

  ngOnInit(): void {
    this.offices = this.officeService.getOffices();
   this.subscription =  this.officeService.officesChanged.subscribe((offices:Office[]) =>
      this.offices = offices);

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }



}
