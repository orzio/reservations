import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../_services/communcation.service';

@Component({
  selector: 'app-desk-city',
  templateUrl: './desk-city.component.html',
  styleUrls: ['./desk-city.component.css']
})
export class DeskCityComponent implements OnInit {

  label:string="Wstecz";
  showDetails = false;
  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.communicationService.deskDetailsClicked.subscribe((data:boolean)=>{
    this.showDetails = data;
    })
  }

}
