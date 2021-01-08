import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Desk } from 'src/app/_models/desk';
import { Router, ActivatedRoute, Params, ActivatedRouteSnapshot } from '@angular/router';
import { DeskService } from 'src/app/_services/desk.service';
import { OfficeService } from 'src/app/_services/office.service';
import { Office } from 'src/app/_models/Office';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-desk-item',
  templateUrl: './desk-item.component.html',
  styleUrls: ['./desk-item.component.css']
})
export class DeskItemComponent implements OnInit, OnDestroy {

  @Input() desk:Desk;
  @Input() index:string;

  subscription :Subscription;
  currentOffice:Office;
  constructor(private activatedRoute: ActivatedRoute, private deskService:DeskService, private officeService: OfficeService, private router: Router) { }


  ngOnInit(): void {
   this.subscription =  this.activatedRoute.params
    .subscribe((params:Params) => {
      this.activatedRoute.params.subscribe((params) =>{
        this.currentOffice = this.officeService.getOfficeById(this.activatedRoute.snapshot.params['id']);
      })
    }
    )}

  onDeleteDesk(){

    this.deskService.deleteDesk(this.desk.id).subscribe(()=>{
      this.deskService.fetchOfficesdesks(this.desk.officeId)
      .subscribe((resp:Desk[]) => {})
    })
    };


    ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    }
  }


