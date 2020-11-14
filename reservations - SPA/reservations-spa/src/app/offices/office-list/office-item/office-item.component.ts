import { Component, OnInit, Input } from '@angular/core';
import { Office } from 'src/app/_models/Office';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeService } from 'src/app/_services/office.service';


@Component({
  selector: 'app-office-item',
  templateUrl: './office-item.component.html',
  styleUrls: ['./office-item.component.css']
})
export class OfficeItemComponent implements OnInit {

  @Input() office:Office;
  @Input() index:number;

  constructor(private activeRoute:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
  
  }

  onEditOffice(){

this.router.navigate([this.index,'edit'],{relativeTo:this.activeRoute});
  }

  onDisplayRooms(){
    this.router.navigate([this.index,'rooms'],{relativeTo:this.activeRoute});
  }

  onDisplayDesks(){
    this.router.navigate([this.index,'desks'],{relativeTo:this.activeRoute});
  }
}
