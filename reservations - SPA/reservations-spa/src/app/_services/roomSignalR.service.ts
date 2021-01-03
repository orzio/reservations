import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { RoomReservationService } from './roomReservation.Service';

@Injectable()
export class RoomSignalRService {

    private hubConnection: signalR.HubConnection

    private roomId:string="";
constructor(private http: HttpClient, private roomReservationService: RoomReservationService) {
    this.roomReservationService.currentRoomIdChanged.subscribe((data:string)=>{
        this.roomId= data;
        console.log("%%%%%%%%%%%%%%%%%ROOM$$$$$"+this.roomId);
    })
 }

public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('http://localhost:44310/reservations')
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  
  public addNewCallendarEventListener = () => {
      this.hubConnection.on("RoomEventsChanged", (data) => {
        console.log(data.roomId+":::::::TERRERERE");
        if(this.roomId == data.roomId){
            console.log("pokoj ktory przegladam: "+this.roomId + " pokoj ktory przyszedl " + data.roomId);
            this.roomReservationService.getCurrentReservations(this.roomId);
        }
          console.log("dudu");
        });
    }
}