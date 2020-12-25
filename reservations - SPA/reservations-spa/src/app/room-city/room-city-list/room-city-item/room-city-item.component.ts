import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/_models/room';
import { DeskReservationService } from 'src/app/_services/deskReservation.service';
import { Router } from '@angular/router';
import { RoomReservationService } from 'src/app/_services/roomReservation.Service';
import { Address } from 'src/app/_models/Address';

@Component({
  selector: 'app-room-city-item',
  templateUrl: './room-city-item.component.html',
  styleUrls: ['./room-city-item.component.css']
})
export class RoomCityItemComponent implements OnInit {

  constructor(private reservationService:RoomReservationService, private router:Router) { }

  ngOnInit(): void {
  }

  
  @Input() officeName:string;
  @Input() officeAddress:Address;
  @Input() room:Room;

  reserveRoom(){
    this.reservationService.currentRoomIdChanged.next(this.room.id); 
    console.log('/callendar/room/'+this.room.id);
    this.router.navigate(['/callendar/room/'+this.room.id]);
  }

}
