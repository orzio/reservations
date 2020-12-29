import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/_models/room';
import { DeskReservationService } from 'src/app/_services/deskReservation.service';
import { Router } from '@angular/router';
import { RoomReservationService } from 'src/app/_services/roomReservation.Service';
import { Address } from 'src/app/_models/Address';
import { RoomOffice } from 'src/app/_models/RoomOffice';
import { RoomService } from 'src/app/_services/room.service';
import { CommunicationService } from 'src/app/_services/communcation.service';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-room-city-item',
  templateUrl: './room-city-item.component.html',
  styleUrls: ['./room-city-item.component.css']
})
export class RoomCityItemComponent implements OnInit {


  currentUser:User;
  roomOffice:RoomOffice;
  @Input() officeName:string;
  @Input() officeAddress:Address;
  @Input() room:Room;

  constructor(private reservationService:RoomReservationService, private router:Router, 
    private communicationService:CommunicationService, private roomService:RoomService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user:User)=>{
      this.currentUser = user;
    })
  }



  reserveRoom(){
    this.reservationService.currentRoomIdChanged.next(this.room.id); 
    console.log('/callendar/room/'+this.room.id);
    this.router.navigate(['/callendar/room/'+this.room.id]);
  }

  navigateToList(){
    this.router.navigate(['/']);
  }

  showOfficeInfo(){
    this.roomOffice= new RoomOffice(this.room,this.officeName, this.officeAddress);
    this.roomService.roomInfoChanged.next(this.roomOffice);
    this.communicationService.roomDetailsClicked.next(true);

  }

}
