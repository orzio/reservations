import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { formatDate } from '@fullcalendar/core';


@Injectable()
export class ImageService {

    constructor(private http: HttpClient) {}
  
    currentMainChanged = new BehaviorSubject<string>('../../assets/user.png');


    public uploadImage(image: File) {
      const formData = new FormData();
  
      const obj = {
        Id:"0bd97f59-3890-45de-ac9d-c27d10ace948",
        RoomId:"0bd97f59-3890-45de-ac9d-c27d10ace948",
        File:image,
        OfficeId:"0bd97f59-3890-45de-ac9d-c27d10ace948",
        IsMain:true
      }
      formData.append('File', image);
      formData.append('Id',"0bd97f59-3890-45de-ac9d-c27d10ace948");
      formData.append('RoomId',"BCDAA4BC-04B3-410E-AA1B-2AE5783841AC");
      formData.append('OfficeId',"A81CC55D-83D5-4096-BD90-72B96FD962A6");
      formData.append('IsMain',"true");
  console.log("upload");
      return this.http.post('http://localhost:44310/photos', formData);
    }

    
    deletePhoto(id:string){
      return this.http.delete('http://localhost:44310/photos/'+id);
  }

  toggleMainPhoto(id:string, currentRoomId:string){
    return this.http.post('http://localhost:44310/photos/room/'+currentRoomId+'main/'+id,{});
  }

}