import { Component, OnInit } from '@angular/core';
import { RoomOffice } from '../_models/RoomOffice';
import { CommunicationService } from '../_services/communcation.service';
import { RoomService } from '../_services/room.service';

@Component({
  selector: 'app-room-office-details',
  templateUrl: './room-office-details.component.html',
  styleUrls: ['./room-office-details.component.css']
})
export class RoomOfficeDetailsComponent implements OnInit {


  message:string="";
roomOffice:RoomOffice;

  constructor(private communicationService:CommunicationService, private roomService:RoomService) { }

  ngOnInit(): void {
      this.roomService.roomInfoChanged.subscribe((data:RoomOffice)=>{
      this.roomOffice = data;
      this.message = this.roomOffice.officeName;
      console.log(this.roomOffice);
    })


  }

  close(){
    this.communicationService.roomDetailsClicked.next(false);
  
  }

}
