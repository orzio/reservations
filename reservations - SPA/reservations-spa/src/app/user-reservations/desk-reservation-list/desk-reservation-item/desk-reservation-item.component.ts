import { Component, OnInit, Input } from '@angular/core';
import { DeskOfficeReservation } from 'src/app/_models/DeskOfficeReservation';
import { User } from 'src/app/_models/user';
import { RoomService } from 'src/app/_services/room.service';
import { RoomReservationService } from 'src/app/_services/roomReservation.Service';
import { CommunicationService } from 'src/app/_services/communcation.service';
import { AuthService } from 'src/app/_services/auth.service';
import { RoomOfficeReservation } from 'src/app/_models/RoomOfficeReservation';
import { RoomOffice } from 'src/app/_models/RoomOffice';
import { DeskReservationService } from 'src/app/_services/deskReservation.service';
import { DeskService } from 'src/app/_services/desk.service';
import { DeskOffice } from 'src/app/_models/DeskOffice';

@Component({
  selector: 'app-desk-reservation-item',
  templateUrl: './desk-reservation-item.component.html',
  styleUrls: ['./desk-reservation-item.component.css']
})
export class DeskReservationItemComponent implements OnInit {

  @Input() reservation: DeskOfficeReservation;
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
     this.deskReservationService.deleteReservation(this.reservation.id).subscribe(()=>{
       this.deskReservationService.getUserReservation(this.currentUser.id).subscribe((reservations:DeskOfficeReservation[])=>{
         this.deskReservationService.deskOfficeReservationChanged.next(reservations);
       })

     })

   }

   showOfficeInfo(){
    let deskOffice= new DeskOffice(this.reservation.deskDto,this.reservation.officeName, this.reservation.officeAddress,this.reservation.officePhoneNumber ,this.reservation.officeEmail);
    this.deskService.deskInfoChanged.next(deskOffice);
    this.communicationService.deskDetailsClicked.next(true);
   }
  

}
