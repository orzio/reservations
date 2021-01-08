import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RoomService } from 'src/app/_services/room.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { OfficeService } from 'src/app/_services/office.service';
import { Office } from 'src/app/_models/Office';
import { Room } from 'src/app/_models/room';
import { Photo } from 'src/app/_models/Photo';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  active = 1;
  roomGuid:string;
  roomId:string;
  editMode:boolean=false;
  roomForm:FormGroup;
  currentOffice:Office;
  officeId:number;
  editedRoom:Room;
  photos:Photo[] =[];
  currentRoomId:string="";



  constructor(private activatedRoute: ActivatedRoute, private roomService:RoomService, private officeService: OfficeService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe((params:Params) => {
      this.roomId=params['roomId'];
      this.editMode = params['roomId']!=null;

      this.activatedRoute.parent.params.subscribe((params) =>{
        this.currentOffice = this.officeService.getOfficeById(params.id);
      })

      this.initForm();
    })
  }

  private initForm(){
    let name='';
    let description ='';
    let seats=0;
    let hasTV = false;
    let hasWhiteBoard=false;
    let hasProjector=false;
    let otherEquipment='';


  if(this.editMode){
    let room = this.roomService.getRoomById(this.roomId);
     name = room.name;
     description = room.description;
     seats = room.seats;
     hasTV = room.hasTV;
     hasWhiteBoard = room.hasWhiteBoard;
     hasProjector = room.hasProjector;
     otherEquipment = room.otherEquipment;
     this.roomGuid = room.id;
     this.photos = room.photos;
  }  

    this.roomForm = new FormGroup({
      'name':new FormControl(name,Validators.required),
      'description':new FormControl(description,Validators.required),
      'seats':new FormControl(seats,Validators.required),
      'hasTV':new FormControl(hasTV),
      'hasWhiteBoard':new FormControl(hasWhiteBoard),
      'hasProjector':new FormControl(hasProjector),
      'otherEquipment':new FormControl(otherEquipment)
    })
  }

  onSubmit(){
    let room:Room = this.roomForm.value;
    room.officeId = this.currentOffice.id;
    room.id = this.roomGuid;
    console.log(room);

    if(this.editMode){
      console.log("editMode");
      this.roomService.updateRoom(this.roomId, room);
    }else{
      console.log("nie editMode");
      this.roomService.addRoom(room);
    }
    this.onCancel();
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.activatedRoute});
  }

}
