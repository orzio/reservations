import { Component, OnInit, Input } from '@angular/core';
import { RoomOfficeReservation } from 'src/app/_models/RoomOfficeReservation';
import { RoomService } from 'src/app/_services/room.service';
import { CommunicationService } from 'src/app/_services/communcation.service';
import { RoomOffice } from 'src/app/_models/RoomOffice';
import { RoomReservationService } from 'src/app/_services/roomReservation.Service';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-room-reservation-item',
  templateUrl: './room-reservation-item.component.html',
  styleUrls: ['./room-reservation-item.component.css']
})
export class RoomReservationItemComponent implements OnInit {

  @Input() reservation: RoomOfficeReservation;
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
     this.roomReservationService.deleteReservation(this.reservation.id).subscribe(()=>{
       this.roomReservationService.getUserReservation(this.currentUser.id).subscribe((reservations:RoomOfficeReservation[])=>{
         this.roomReservationService.roomOfficeReservationChanged.next(reservations);
       })

     })

   }

   showOfficeInfo(){
    let roomOffice= new RoomOffice(this.reservation.roomDto,this.reservation.officeName, this.reservation.officeAddress);
    this.roomService.roomInfoChanged.next(roomOffice);
    this.communicationService.roomDetailsClicked.next(true);
   }
  
}
