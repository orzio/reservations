import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt'
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    baseUrl = `${environment.apiUrl}`;
    jwtHelper = new JwtHelperService();
    decodedToken:any;
    currentUser: User;
    
    constructor(private http: HttpClient){
    console.log("authservice");
    }

    login(model:any){
        return this.http.post(`${this.baseUrl}login/`, model).pipe(
            map((response:any) =>{
                const user = response;
                if(user){
                    console.log(user);
                    localStorage.setItem('token', user.jwtToken);
                    localStorage.setItem('user', JSON.stringify(user.user));
                    this.decodedToken = this.jwtHelper.decodeToken(user.jwtToken);
                    this.currentUser = user.user;
                    console.log(this.decodedToken);
                    console.log(this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
                    console.log(this.decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

                }
            }),
            catchError(errResp =>{
                let errorMsg = 'An error occured';
                if(!errResp.error || !errResp.error.error){
                    return throwError(errorMsg);
                }
               
                errorMsg = errResp.error;
                throwError(errorMsg);
            })
        )
    }

    register(user:User):Observable<Object>{
        return this.http.post(`${this.baseUrl}users`,user);
    }
} 