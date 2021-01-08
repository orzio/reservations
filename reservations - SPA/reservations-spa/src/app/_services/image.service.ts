import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { formatDate } from '@fullcalendar/core';


@Injectable()
export class ImageService {

    constructor(private http: HttpClient) {}
  
    currentMainChanged = new BehaviorSubject<string>('../../assets/user.png');
    
    deletePhoto(id:string){
      return this.http.delete('http://localhost:44310/photos/'+id);
  }

  toggleMainPhoto(id:string, currentRoomId:string){
    return this.http.post('http://localhost:44310/photos/room/'+currentRoomId+'/main/'+id,{});
  }

}