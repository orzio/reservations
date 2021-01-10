import { Component, OnInit, Input } from '@angular/core';
import { RoomReservationForManager } from 'src/app/_models/RoomReservationForManager';
import { User } from 'src/app/_models/user';
import { RoomService } from 'src/app/_services/room.service';
import { RoomReservationService } from 'src/app/_services/roomReservation.Service';
import { CommunicationService } from 'src/app/_services/communcation.service';
import { AuthService } from 'src/app/_services/auth.service';
import { RoomOfficeReservation } from 'src/app/_models/RoomOfficeReservation';
import { ReservationStatus } from 'src/app/_models/ReservationStatus';

@Component({
  selector: 'app-manager-room-list-item-reservations',
  templateUrl: './manager-room-list-item-reservations.component.html',
  styleUrls: ['./manager-room-list-item-reservations.component.css']
})
export class ManagerRoomListItemReservationsComponent implements OnInit {

  @Input() reservation: RoomReservationForManager;
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
  constructor(private roomService:RoomService,private roomReservationService:RoomReservationService, private communicationService:CommunicationService,
    private authService:AuthService) {

   }

   cancelReservation(){
     this.roomReservationService.updateReservationStatus(this.reservation.id,ReservationStatus.Rejected).subscribe(
       ()=>{
        this.handleSucess();
       }
     )
   }


   acceptReservation(){
    this.roomReservationService.updateReservationStatus(this.reservation.id,ReservationStatus.Accepted)
    .subscribe(
      ()=>{
      this.handleSucess();
    }
      
    )
  }


  postopneReservation(){
    this.roomReservationService.updateReservationStatus(this.reservation.id,ReservationStatus.WatingForApproval).subscribe(
      ()=>{
        this.handleSucess();
      }
    )
  }


  private handleSucess(){
    this.roomReservationService.getReservationForManager(this.currentUser.id).subscribe((reservations:RoomReservationForManager[])=>{
      this.roomReservationService.reservationsForManagerChanged.next(reservations);
  });
}



}
