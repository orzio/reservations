import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResetPassword } from '../_models/ResetPassword';
import { throwError, Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DeskReservation } from '../_models/DeskReservation';
import { ReservationDto } from '../_models/ReservationDto';
import { DeskOfficeReservation } from '../_models/DeskOfficeReservation';
import { ReservationStatus } from '../_models/ReservationStatus';

@Injectable({
    providedIn: 'root'
  })
export class DeskReservationService {
    baseUrl = 'http://localhost:44310/deskReservations';

    desksReservations:ReservationDto[];
    deskReservationsChanged =new Subject<ReservationDto[]>();
    deskOfficeReservationChanged = new Subject<DeskOfficeReservation[]>();
    currentDeskIdChanged = new Subject<string>();

    constructor(private http:HttpClient){}

    addReservation(reservation:DeskReservation):Observable<Object>{
        //console.log("reservationService");
        //console.log(reservation);
        return this.http.post<DeskReservation>(`${this.baseUrl}`,reservation)
        .pipe(
            catchError(this.handleError)
            );
    }


    fetchDeskReservations(deskId: string){
        return this.http.get<ReservationDto[]>(`${this.baseUrl}/${deskId}`)
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
 
    updateReservation(reservation: DeskReservation){
            return this.http.put(`${this.baseUrl}`,reservation);
    }


    deleteReservation(id:string){
            return this.http.delete(`${this.baseUrl}/${id}`);
    }

    setDeskReservations(deskReservations:ReservationDto[]){
        this.desksReservations = deskReservations;
        this.deskReservationsChanged.next(this.desksReservations.slice());
      }

      getUserReservation(userId:string){
          return this.http.get<DeskOfficeReservation[]>(`http://localhost:44310/DeskReservations/user/${userId}`);
      }


      getCurrentReservations(deskId:string){
        let events:ReservationDto[]=[];
        this.fetchDeskReservations(deskId).subscribe((resp:ReservationDto[]) => {
            events = resp;
            this.setDeskReservations(events)
            // this.currentRoomIdChanged.next(this.roomId);
        })
}

}