import { Component, OnInit } from '@angular/core';
import { DeskOfficeReservation } from 'src/app/_models/DeskOfficeReservation';
import { DeskReservationService } from 'src/app/_services/deskReservation.service';
import { CommunicationService } from 'src/app/_services/communcation.service';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-desk-reservation-list',
  templateUrl: './desk-reservation-list.component.html',
  styleUrls: ['./desk-reservation-list.component.css']
})
export class DeskReservationListComponent implements OnInit {

  desksReservations:DeskOfficeReservation[] =[];
  showDetails:boolean=false;
  private user:User;
  
  constructor( private authService:AuthService, private deskReservationService: DeskReservationService,private communicationService:CommunicationService) { }

  ngOnInit(): void {

    this.authService.user.subscribe((user:User)=>{
      this.user = user;
    })

    this.deskReservationService.deskOfficeReservationChanged
      .subscribe((deskReservations:DeskOfficeReservation[])=>{
      this.desksReservations = deskReservations;
    })

    this.communicationService.deskDetailsClicked.subscribe((data:boolean)=>{
      this.showDetails = data;
      })

    this.deskReservationService.getUserReservation(this.user.id)
    .subscribe((desksReservations:DeskOfficeReservation[])=>{
      this.desksReservations = desksReservations;
    })
  }

}
