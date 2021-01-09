import { Component, OnInit, OnDestroy } from '@angular/core';
import { Room } from 'src/app/_models/room';
import { RoomService } from 'src/app/_services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommunicationService } from 'src/app/_services/communcation.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit,OnDestroy {
  subscription :Subscription;
  rooms:Room[];
  constructor(private roomService:RoomService,
    private communicationService:CommunicationService,
    private activeRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    const _this = this;
    // this.rooms = this.roomService.getRooms();
    this.subscription = this.roomService.roomsChanged
    .subscribe(
      (rooms:Room[]) =>{
        _this.rooms = rooms;
        //console.log("room-list");
        //console.log(rooms);
      }
    )
  }

  onAddRoom(){
    this.router.navigate(['new'], {relativeTo:this.activeRoute});
  }

  ngOnDestroy():void{
    this.subscription?.unsubscribe();
  }

  goToPrevious(){
    this.communicationService.roomsClicked.next(false);
    this.router.navigate(['../'],{relativeTo:this.activeRoute});
  }

  

}
