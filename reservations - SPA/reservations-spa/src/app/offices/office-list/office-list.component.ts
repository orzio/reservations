import { Component, OnInit, OnDestroy } from '@angular/core';
import { Office } from 'src/app/_models/Office';
import { OfficeService } from 'src/app/_services/office.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})
export class OfficeListComponent implements OnInit, OnDestroy {
subscription :Subscription;
  offices: Office[];

  constructor(private officeService: OfficeService, 
    private activeRoute:ActivatedRoute,
    private router:Router) { }
    
    ngOnInit(): void {
    this.offices = this.officeService.getOffices();
    console.log(`officeList :${this.offices}`);
    this.subscription = this.officeService.officesChanged
    .subscribe(
      (offices:Office[])=>{
        this.offices=offices;
      }
    )
  }

  onAddOffice(){
    this.router.navigate(['new'],{relativeTo: this.activeRoute});
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
