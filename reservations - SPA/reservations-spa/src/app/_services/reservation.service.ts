import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResetPassword } from '../_models/ResetPassword';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reservation } from '../_models/Reservation';
import { ReservationDto } from '../_models/ReservationDto';

@Injectable({
    providedIn: 'root'
  })
export class ReservationService {
    baseUrl = 'https://localhost:44310/deskReservations';

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
}