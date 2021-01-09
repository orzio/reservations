import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { DeskReservationService } from 'src/app/_services/deskReservation.service';
import { RoomReservationService } from 'src/app/_services/roomReservation.Service';
import { DeskOfficeReservation } from 'src/app/_models/DeskOfficeReservation';
import { RoomOfficeReservation } from 'src/app/_models/RoomOfficeReservation';
import { User } from 'src/app/_models/user';
import { CommunicationService } from 'src/app/_services/communcation.service';

@Component({
  selector: 'app-room-reservation-list',
  templateUrl: './room-reservation-list.component.html',
  styleUrls: ['./room-reservation-list.component.css']
})
export class RoomReservationListComponent implements OnInit {

  constructor(private authService:AuthService,private roomReservationService: RoomReservationService,
    private communicationService:CommunicationService) { }

    showDetails:boolean=false;
 
  roomsReservations:RoomOfficeReservation[] =[];
  private user:User;
  ngOnInit(): void {
    this.authService.user.subscribe((user:User)=>{
      this.user = user;
    })

    this.roomReservationService.getUserReservation(this.user.id)
    .subscribe((roomsReservations:RoomOfficeReservation[])=>{
      this.roomsReservations = roomsReservations;
    })

    this.roomReservationService.roomOfficeReservationChanged
      .subscribe((roomsReservations:RoomOfficeReservation[])=>{
      this.roomsReservations = roomsReservations;
    })

    this.communicationService.roomDetailsClicked.subscribe((data:boolean)=>{
      this.showDetails = data;
      })


  }

}
