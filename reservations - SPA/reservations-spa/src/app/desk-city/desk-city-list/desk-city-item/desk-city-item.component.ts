import { Component, OnInit, Input } from '@angular/core';
import { Desk } from 'src/app/_models/desk';
import { Address } from 'src/app/_models/Address';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desk-city-item',
  templateUrl: './desk-city-item.component.html',
  styleUrls: ['./desk-city-item.component.css']
})
export class DeskCityItemComponent implements OnInit {


  @Input() officeName:string;
  @Input() officeAddress:Address;
  @Input() desk:Desk;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  reserveDesk(){
    console.log('/callendar/'+this.desk.id);
    this.router.navigate(['/callendar/'+this.desk.id]);
  }

}
