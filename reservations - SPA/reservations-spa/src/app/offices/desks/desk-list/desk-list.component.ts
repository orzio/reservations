import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeskService } from 'src/app/_services/desk.service';
import { CommunicationService } from 'src/app/_services/communcation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Desk } from 'src/app/_models/desk';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-desk-list',
  templateUrl: './desk-list.component.html',
  styleUrls: ['./desk-list.component.css']
})
export class DeskListComponent implements OnInit, OnDestroy {

  subscription:Subscription;
  desks:Desk[];

  constructor(private deskService:DeskService,
    private communicationService:CommunicationService,
    private activeRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.desks = this.deskService.getDesks();
    this.subscription = this.deskService.desksChanged
    .subscribe(
      (desks:Desk[])=>{
      this.desks = desks;
    })
  }

  onAddDesk(){
    this.router.navigate(['new'], {relativeTo:this.activeRoute});
  }

  ngOnDestroy():void{
    this.subscription?.unsubscribe();
  }

  goToPrevious(){
    this.router.navigate(['.'],{relativeTo:this.activeRoute.parent});
  }

}
