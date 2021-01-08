import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from '../_models/Photo';
import { ImageService } from '../_services/image.service';
import { RoomService } from '../_services/room.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  constructor(private imageService:ImageService, private roomService:RoomService, private activatedRoute:ActivatedRoute, private router:Router) { }
  @Input() photos: Photo[];
  uploader:FileUploader;
  currentMainPhoto: Photo;
  currentRoomId:string="";
  currentOfficeId:string ="";
  testOfficeId:string ="";
  ngOnInit(): void {
    console.log("ngoninit-----PhotoCompoennt")
    this.roomService.roomDetailsId.subscribe((data:string)=>{
      const _this = this;
      _this.currentRoomId = data;
      console.log(data);
      console.log("Kurka:" + _this.currentRoomId);
      this.initializeUploader();
    })

  this.roomService.currentOfficeId.subscribe((officeId:string)=>{
      this.currentOfficeId = officeId;
    })

  }
  initializeUploader() {

    this.uploader = new FileUploader({
      url: 'http://localhost:44310/photos/room/'+this.currentRoomId,
      // authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
    
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
         const res: Photo = JSON.parse(response);
         const photo = {
           id: res.id,
           roomId:res.roomId,
           officeId:res.officeId,
           photoUrl: res.photoUrl,
           isMain:res.isMain
         };
         console.log(photo.photoUrl);
         this.photos.push(photo);
         if(this.photos.length ==1 && photo.isMain){
           this.roomService.fetchOfficesRoom(this.currentOfficeId).subscribe(()=>{});
         }

      }
    }
  }

  remove(id: string){
    this.imageService.deletePhoto(id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id),1);
        
      }, error => {
        
      })
    
  }


  setMainPhoto(photo: Photo, currentRoomId:string) {
    this.imageService.toggleMainPhoto(photo.id, this.currentRoomId).subscribe(() => {
      this.currentMainPhoto = this.photos.filter(p => p.isMain === true)[0];
      this.currentMainPhoto.isMain = false;
      photo.isMain = true;
      this.roomService.fetchOfficesRoom( this.currentOfficeId).subscribe(()=>{});
      this.imageService.currentMainChanged.next(photo.photoUrl);
    }, error => {
     
    });
  }


}



