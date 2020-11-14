import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt'
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';

export interface LoginResponse{
    jwtToken:string;
    refreshToken:string;
} 

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    user= new Subject<User>();

    baseUrl = `${environment.apiUrl}`;
    jwtHelper = new JwtHelperService();
    decodedToken:any;
    
    constructor(private http: HttpClient){
    console.log("authservice");
    }

    login(model:any){
        return this.http.post<LoginResponse>(`${this.baseUrl}login/`, model).pipe(
            catchError(this.handleError),
            tap((response:LoginResponse) =>{
                this.decodedToken = this.jwtHelper.decodeToken(response.jwtToken);
                
                const expDate = new Date(new Date().getTime() + +this.decodedToken['exp']*1000);
                const userId = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
                const userRole = this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                const user = new User(userId,response.jwtToken,expDate,response.refreshToken);
                
                this.user.next(user);
                console.log(user);
                console.log(expDate);
                // if(user){
                //     console.log(user);
                //     localStorage.setItem('token', user.jwtToken);
                //     localStorage.setItem('user', JSON.stringify(user.user));
                //     let currentUser = user.user;
                //     console.log(this.decodedToken);
                //     console.log(this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
                //     console.log(this.decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
                // }
            }),
            
            
            
        )
    }


    register(user:User):Observable<Object>{
        return this.http.post(`${this.baseUrl}users`,user).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(errResp: HttpErrorResponse){
        let errorMsg = 'An error occured';
        if(!errResp.error || !errResp.error.error){
            return throwError(errorMsg);
        }
       
        errorMsg = errResp.error;
        throwError(errorMsg);
    }
} 