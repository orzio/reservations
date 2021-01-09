import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { RoomReservationService } from 'src/app/_services/roomReservation.Service';
import { CommunicationService } from 'src/app/_services/communcation.service';
import { User } from 'src/app/_models/user';
import { RoomReservationForManager } from 'src/app/_models/RoomReservationForManager';

@Component({
  selector: 'app-manager-room-list-reservations',
  templateUrl: './manager-room-list-reservations.component.html',
  styleUrls: ['./manager-room-list-reservations.component.css']
})
export class ManagerRoomListReservationsComponent implements OnInit {


  constructor(private authService:AuthService,private roomReservationService: RoomReservationService,
    private communicationService:CommunicationService) { }

    showDetails:boolean=false;
 
  roomsReservations:RoomReservationForManager[] =[];
  private user:User;
  ngOnInit(): void {
    this.authService.user.subscribe((user:User)=>{
      this.user = user;
    })

    this.roomReservationService.getReservationForManager(this.user.id)
    .subscribe((roomsReservations:RoomReservationForManager[])=>{
      this.roomsReservations = roomsReservations;
    })

    this.roomReservationService.reservationsForManagerChanged
      .subscribe((roomsReservations:RoomReservationForManager[])=>{
      this.roomsReservations = roomsReservations;
    })

  }

}
