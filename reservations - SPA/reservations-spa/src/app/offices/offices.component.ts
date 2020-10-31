import { Component, OnInit } from '@angular/core';
import { Office } from '../_models/Office';
import { OfficeService } from '../_services/office.service';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

}
 