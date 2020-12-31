import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { RoomReservationService } from './roomReservation.Service';

@Injectable()
export class SignalRService {

    private hubConnection: signalR.HubConnection

constructor(private http: HttpClient, private roomReservationService: RoomReservationService) { }




public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('http://localhost:44310/reservations')
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  
  public addTransferChartDataListener = () => {
      this.hubConnection.on("rere", (data) => {
          this.roomReservationService.getCurrentReservations();
          console.log("dudu");
        });
    }
}