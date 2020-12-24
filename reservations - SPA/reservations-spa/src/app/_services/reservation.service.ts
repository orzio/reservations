import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResetPassword } from '../_models/ResetPassword';
import { throwError, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reservation } from '../_models/Reservation';
import { ReservationDto } from '../_models/ReservationDto';

@Injectable({
    providedIn: 'root'
  })
export class ReservationService {
    baseUrl = 'https://localhost:44310/deskReservations';

    desksReservations:ReservationDto[];
    deskReservationsChanged =new Subject<ReservationDto[]>();
    currentDeskIdChanged = new Subject<string>();

    constructor(private http:HttpClient){}

    addReservation(reservation:Reservation):Observable<Object>{
        console.log("reservationService");
        console.log(reservation);
        return this.http.post<Reservation>(`${this.baseUrl}`,reservation)
        .pipe(
            catchError(this.handleError)
            );
    }


    fetchDeskReservations(deskId: string){
        return this.http.get<ReservationDto[]>(`${this.baseUrl}/${deskId}`);
    }

    private handleError(errResp:HttpErrorResponse){
        let errorMsg = 'Wystąpił Błąd. Prosimy spróbować później';
        if(!errResp.error || !errResp.error.error)
            return throwError(errorMsg);

        errorMsg = errResp.error;
        return throwError(errorMsg);  
}
 
    updateReservation(reservation: Reservation){
            return this.http.put(`${this.baseUrl}`,reservation);
    }


    deleteReservation(id:string){
            return this.http.delete(`${this.baseUrl}/${id}`);
    }

    setDeskReservations(deskReservations:ReservationDto[]){
        this.desksReservations = deskReservations;
        this.deskReservationsChanged.next(this.desksReservations.slice());
      }

}