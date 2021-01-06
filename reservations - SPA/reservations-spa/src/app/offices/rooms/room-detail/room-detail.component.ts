import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/_services/room.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Room } from 'src/app/_models/room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  officeId:string;
  room:Room;
  index:number;
  constructor(private roomService:RoomService,
     private activatedRoute:ActivatedRoute,
     private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:Params)=>{
    this.index=+params['roomId'];
    this.room = this.roomService.getRoomById(this.index);
    this.roomService.photoRoomChanged.next(this.room);
    console.log("::::::::::::::::::::::::::::")
    console.log(this.room.mainUrl);
    this.officeId = this.room.officeId;
    });
    this.roomService.roomUpdated.subscribe((resp:Room)=>{
      this.room = resp;

    })
  
  }

  onDelete():void{
    this.roomService.deleteRoom(this.index).subscribe(response =>{

      this.roomService.fetchRooms().subscribe((response:Room[]) =>{
        this.roomService.roomsChanged.next(response.filter(x => x.officeId == this.officeId));
        this.router.navigate(['../'],{relativeTo:this.activatedRoute});
      })
    })
  }


}
