import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/_models/room';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/_services/room.service';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.css']
})
export class RoomItemComponent implements OnInit {

  @Input() room:Room;
  @Input() index:number;

  constructor(private router:Router, private activeRoute:ActivatedRoute, private roomService:RoomService) { }

  ngOnInit(): void {
  }

  onEditRoom(){
    this.roomService.roomDetailsId.next(this.room.id);
    this.router.navigate([this.index,'edit'],{relativeTo:this.activeRoute});
  };
}
