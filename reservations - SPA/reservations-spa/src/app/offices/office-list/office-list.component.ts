import { Component, OnInit, OnDestroy } from '@angular/core';
import { Office } from 'src/app/_models/Office';
import { OfficeService } from 'src/app/_services/office.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';


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

      this.subscription = this.authService.user.subscribe((user:User) => {
      })

    this.offices = this.officeService.getUserOffice();
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
    this.subscription?.unsubscribe();
  }

}
