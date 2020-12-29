import { Component, OnInit, Input } from '@angular/core';
import { CommunicationService } from '../_services/communcation.service';
import { DeskService } from '../_services/desk.service';
import { DeskOffice } from '../_models/DeskOffice';
import { RoomOffice } from '../_models/RoomOffice';

@Component({
  selector: 'app-office-details-popup',
  templateUrl: './office-details-popup.component.html',
  styleUrls: ['./office-details-popup.component.css']
})
export class OfficeDetailsPopupComponent implements OnInit {
message:string="";
deskOffice:DeskOffice;

  constructor(private communicationService:CommunicationService, private deskService:DeskService) { }

  ngOnInit(): void {
      this.deskService.deskInfoChanged.subscribe((data:DeskOffice)=>{
      this.deskOffice = data;
      this.message = this.deskOffice.officeName;
    })


  }

  close(){
    this.communicationService.deskDetailsClicked.next(false);
  
  }
}
