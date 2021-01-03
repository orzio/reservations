import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { DeskReservationService } from './deskReservation.service';

@Injectable()
export class DeskSignalRService {

    private hubConnection: signalR.HubConnection

    deskId:string="";
constructor(private http: HttpClient, private deskReservationService: DeskReservationService) {
    this.deskReservationService.currentDeskIdChanged.subscribe((data:string)=>{
        this.deskId= data;
        // console.log("%%%%%%%%%%%%%%%%%Desk$$$$$"+this.deskReservationService);
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

  
  public addNewCallendarEventListener = (deskId:string) => {
    //   console.log("::::::::::::SignalR" +deskId);
      this.hubConnection.on("deskEventsChanged", (data) => {
        // console.log(data.deskId+":::::::TERRERERE");
        if(this.deskId == data.deskId){
            this.deskReservationService.getCurrentReservations(this.deskId);
        }
        //   console.log("deskdesk");
        });
    }


}