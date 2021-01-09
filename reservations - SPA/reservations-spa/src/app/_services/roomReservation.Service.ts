import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResetPassword } from '../_models/ResetPassword';
import { throwError, Observable, Subject, ReplaySubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RoomReservation } from '../_models/RoomReservation';
import { ReservationDto } from '../_models/ReservationDto';
import { RoomOfficeReservation } from '../_models/RoomOfficeReservation';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReservationStatus } from '../_models/ReservationStatus';
import { RoomReservationForManager } from '../_models/RoomReservationForManager';




@Injectable({
    providedIn: 'root'
  })
export class RoomReservationService {
    baseUrl = 'http://localhost:44310/roomReservation';

    roomsReservations:ReservationDto[];
    roomReservationsChanged =new Subject<ReservationDto[]>();
    roomOfficeReservationChanged = new Subject<RoomOfficeReservation[]>();
    reservationsForManagerChanged = new Subject<RoomReservationForManager[]>();
    currentRoomIdChanged = new Subject<string>();

    constructor(private http:HttpClient, private activatedRoute:  ActivatedRoute){}

    addReservation(reservation:RoomReservation):Observable<Object>{
        //console.log("reservationService");
        //console.log(reservation);
        return this.http.post<RoomReservation>(`${this.baseUrl}`,reservation)
        .pipe(
            catchError(this.handleError)
            );
    }


    fetchRoomReservations(roomId: string){
        //console.log("Fetch" + roomId);
        return this.http.get<ReservationDto[]>(`${this.baseUrl}/${roomId}`)
        .pipe(
            map(reservations => {
                return reservations.filter(x => x.status==ReservationStatus.Accepted || x.status==ReservationStatus.WatingForApproval) 
            })
        );
    }

    private handleError(errResp:HttpErrorResponse){
        let errorMsg = 'Wystąpił Błąd. Prosimy spróbować później';
        if(!errResp.error || !errResp.error.error)
            return throwError(errorMsg);

        errorMsg = errResp.error;
        return throwError(errorMsg);  
}
 
    updateReservation(reservation: RoomReservation){
            return this.http.put(`${this.baseUrl}`,reservation);
    }

    updateReservationStatus(reservationId: string, newStatus:number){
        return this.http.put(`${this.baseUrl}/manager/updatestatus/${reservationId}`,{id:reservationId, status:newStatus});
}


    deleteReservation(id:string){
            return this.http.delete(`${this.baseUrl}/${id}`);
    }

    setRoomReservations(roomReservations:ReservationDto[]){
        this.roomsReservations = roomReservations;
        this.roomReservationsChanged.next(this.roomsReservations.slice());
      }

      getUserReservation(userId:string){
        return this.http.get<RoomOfficeReservation[]>(`http://localhost:44310/RoomReservation/user/${userId}`);
    }


    getCurrentReservations(roomId:string){
        let events:ReservationDto[]=[];
        this.fetchRoomReservations(roomId).subscribe((resp:ReservationDto[]) => {
            events = resp;
            this.setRoomReservations(events)
            this.currentRoomIdChanged.next(roomId);
        })
    }

    
    getReservationForManager(managerId:string){
        return this.http.get<RoomReservationForManager[]>(`http://localhost:44310/RoomReservation/manager/${managerId}`);
    }



}