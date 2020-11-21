import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResetPassword } from '../_models/ResetPassword';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class ResetPasswordService {
    baseUrl = `${environment.apiUrl}`;

    constructor(private http:HttpClient){}

    forgotPassword(email:string):Observable<Object>{
        return this.http.post(`${this.baseUrl}forgotpassword/sendemail`,{Email:email})
        .pipe(
            catchError(this.handleError)
            );
    }

    resetPassword(resetPassword:ResetPassword):Observable<Object>{
        return this.http.post(`${this.baseUrl}forgotpassword/resetpassword`,resetPassword)
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(errResp:HttpErrorResponse){
        let errorMsg = 'Wystąpił Błąd. Prosimy spróbować później';
        if(!errResp.error || !errResp.error.error)
            return throwError(errorMsg);

        errorMsg = errResp.error;
        return throwError(errorMsg);  
        
}
}