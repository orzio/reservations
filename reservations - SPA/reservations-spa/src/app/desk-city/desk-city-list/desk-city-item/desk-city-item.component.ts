import { Component, OnInit, Input } from '@angular/core';
import { Desk } from 'src/app/_models/desk';
import { Address } from 'src/app/_models/Address';

@Component({
  selector: 'app-desk-city-item',
  templateUrl: './desk-city-item.component.html',
  styleUrls: ['./desk-city-item.component.css']
})
export class DeskCityItemComponent implements OnInit {


  @Input() officeName:string;
  @Input() officeAddress:Address;
  @Input() desk:Desk;

  constructor() { }

  ngOnInit(): void {
  }

}
