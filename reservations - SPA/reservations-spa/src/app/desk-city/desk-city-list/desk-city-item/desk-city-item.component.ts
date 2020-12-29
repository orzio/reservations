import { Component, OnInit, Input } from '@angular/core';
import { Desk } from 'src/app/_models/desk';
import { Address } from 'src/app/_models/Address';
import { Router } from '@angular/router';
import { DeskReservationService } from 'src/app/_services/deskReservation.service';
import { CommunicationService } from 'src/app/_services/communcation.service';
import { DeskOffice } from 'src/app/_models/DeskOffice';
import { DeskService } from 'src/app/_services/desk.service';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-desk-city-item',
  templateUrl: './desk-city-item.component.html',
  styleUrls: ['./desk-city-item.component.css']
})
export class DeskCityItemComponent implements OnInit {


  currentUser:User;
  deskOffice : DeskOffice;

  @Input() officeName:string;
  @Input() officeAddress:Address;
  @Input() desk:Desk;
  showInfo:boolean = false;

  constructor(private router:Router, private reservationService:DeskReservationService, 
    private communicationService:CommunicationService, private deskService:DeskService, private authService:AuthService) { }


    ngOnInit(): void {
      this.authService.user.subscribe((user:User)=>{
        this.currentUser = user;
      })
    }


  reserveDesk(){
    this.reservationService.currentDeskIdChanged.next(this.desk.id); 
    console.log('/callendar/desk/'+this.desk.id);
    this.router.navigate(['/callendar/desk/'+this.desk.id]);
  }

  
  showOfficeInfo(){
    this.deskOffice= new DeskOffice(this.desk,this.officeName, this.officeAddress);
    this.deskService.deskInfoChanged.next(this.deskOffice);
    this.communicationService.deskDetailsClicked.next(true);

  }

}
