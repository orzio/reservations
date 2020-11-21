import { Component, OnInit, OnDestroy } from '@angular/core';
import { Office } from 'src/app/_models/Office';
import { OfficeService } from 'src/app/_services/office.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})
export class OfficeListComponent implements OnInit, OnDestroy {
subscription :Subscription;
  offices: Office[];

  constructor(private officeService: OfficeService, 
    private authService:AuthService,
    private activeRoute:ActivatedRoute,
    private router:Router) { }
    
    ngOnInit(): void {
      let userId = this.authService.user.value.id;
      console.log("userId"+userId);

    this.offices = this.officeService.getUserOffice();
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
