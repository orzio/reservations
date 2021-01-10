import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { RoomReservationService } from 'src/app/_services/roomReservation.Service';
import { CommunicationService } from 'src/app/_services/communcation.service';
import { User } from 'src/app/_models/user';
import { RoomReservationForManager } from 'src/app/_models/RoomReservationForManager';
import { ReservationStatus } from 'src/app/_models/ReservationStatus';
import { DeskReservationService } from 'src/app/_services/deskReservation.service';
import { DeskReservationForManager } from 'src/app/_models/DeskReservationForManager';


@Component({
  selector: 'app-manager-desk-list-reservation',
  templateUrl: './manager-desk-list-reservation.component.html',
  styleUrls: ['./manager-desk-list-reservation.component.css']
})
export class ManagerDeskListReservationComponent implements OnInit {


  constructor(private authService:AuthService,private deskReservationService: DeskReservationService,
    private communicationService:CommunicationService) { }

    searchDesk;
    showDetails:boolean=false;
    filterargs = {status: ReservationStatus.WatingForApproval};
  deskReservations:DeskReservationForManager[] =[];
  private user:User;
  ngOnInit(): void {
    this.authService.user.subscribe((user:User)=>{
      this.user = user;
    })

    this.deskReservationService.getReservationForManager(this.user.id)
    .subscribe((desksReservations:DeskReservationForManager[])=>{
      this.deskReservations = desksReservations;
    })

    this.deskReservationService.reservationsForManagerChanged
      .subscribe((desksReservations:DeskReservationForManager[])=>{
      this.deskReservations = desksReservations;
    })

  }
}
