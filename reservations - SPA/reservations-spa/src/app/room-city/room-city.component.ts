import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../_services/communcation.service';

@Component({
  selector: 'app-room-city',
  templateUrl: './room-city.component.html',
  styleUrls: ['./room-city.component.css']
})
export class RoomCityComponent implements OnInit {

  label:string="Wstecz";
  showDetails = false;
  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.communicationService.roomDetailsClicked.subscribe((data:boolean)=>{
    this.showDetails = data;
    })
  }



}
