import { Component, OnInit } from '@angular/core';
import { Office } from '../_models/Office';
import { OfficeService } from '../_services/office.service';
import { ActivatedRoute, Params, Router, ChildActivationEnd } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { CommunicationService } from '../_services/communcation.service';


@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private router:Router, private commicationService: CommunicationService) { }


  isRoomsTabOpen:boolean = false;
  isDesksTabOpen:boolean = false;
  
  ngOnInit(): void {
    this.commicationService.roomsClicked.subscribe((resp:boolean) =>{
      console.log(`odpowiedz z komunikacji:${resp}`);
    this.isRoomsTabOpen = resp;
    })
}
}
 