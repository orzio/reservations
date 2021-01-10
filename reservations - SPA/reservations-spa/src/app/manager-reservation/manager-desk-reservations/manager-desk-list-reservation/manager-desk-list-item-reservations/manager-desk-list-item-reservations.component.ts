import { Component, OnInit, Input } from '@angular/core';
import { RoomReservationForManager } from 'src/app/_models/RoomReservationForManager';
import { User } from 'src/app/_models/user';
import { RoomService } from 'src/app/_services/room.service';
import { RoomReservationService } from 'src/app/_services/roomReservation.Service';
import { CommunicationService } from 'src/app/_services/communcation.service';
import { AuthService } from 'src/app/_services/auth.service';
import { RoomOfficeReservation } from 'src/app/_models/RoomOfficeReservation';
import { ReservationStatus } from 'src/app/_models/ReservationStatus';
import { DeskReservationForManager } from 'src/app/_models/DeskReservationForManager';
import { DeskService } from 'src/app/_services/desk.service';
import { DeskReservationService } from 'src/app/_services/deskReservation.service';

@Component({
  selector: 'app-manager-desk-list-item-reservations',
  templateUrl: './manager-desk-list-item-reservations.component.html',
  styleUrls: ['./manager-desk-list-item-reservations.component.css']
})
export class ManagerDeskListItemReservationsComponent implements OnInit {

  @Input() reservation: DeskReservationForManager;
  reservationStartDay:string="";
  reservationEndDay:string="";
  reservationStartHour:string="";
  reservationEndHour:string="";


  private currentUser:User;


  
  ngOnInit(): void {
    this.reservationStartDay  = new Date(this.reservation.startDate).toLocaleDateString();
    this.reservationEndDay = new Date(this.reservation.endDate).toLocaleDateString(); 
    this.reservationStartHour = new Date(this.reservation.startDate).toLocaleTimeString('en-UK', { hour12: false });
    this.reservationEndHour = new Date(this.reservation.endDate).toLocaleTimeString('en-UK', { hour12: false });
    this.authService.user.subscribe((user:User)=>{
    this.currentUser = user;
    })

  }
  constructor(private deskService:DeskService,private deskReservationService:DeskReservationService, private communicationService:CommunicationService,
    private authService:AuthService) {

   }

   cancelReservation(){
     this.deskReservationService.updateReservationStatus(this.reservation.id,ReservationStatus.Rejected).subscribe(
       ()=>{
        this.handleSucess();
       }
     )
   }


   acceptReservation(){
    this.deskReservationService.updateReservationStatus(this.reservation.id,ReservationStatus.Accepted)
    .subscribe(
      ()=>{
      this.handleSucess();
    }
      
    )
  }


  postopneReservation(){
    this.deskReservationService.updateReservationStatus(this.reservation.id,ReservationStatus.WatingForApproval).subscribe(
      ()=>{
        this.handleSucess();
      }
    )
  }


  private handleSucess(){
    this.deskReservationService.getReservationForManager(this.currentUser.id).subscribe((reservations:DeskReservationForManager[])=>{
      this.deskReservationService.reservationsForManagerChanged.next(reservations);
  });
}



}
