import { Component, OnInit } from '@angular/core';
import { Office } from 'src/app/_models/Office';
import { Subscription } from 'rxjs/internal/Subscription';
import { OfficeService } from 'src/app/_services/office.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-city-list',
  templateUrl: './room-city-list.component.html',
  styleUrls: ['./room-city-list.component.css']
})
export class RoomCityListComponent implements OnInit {
  offices:Office[]=[];
  subscription:Subscription;
  
  constructor(private officeService:OfficeService, private router:Router) { }

  ngOnInit(): void {
    this.offices = this.officeService.getOffices();
   this.subscription =  this.officeService.officesChanged.subscribe((offices:Office[]) =>
      this.offices = offices);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
