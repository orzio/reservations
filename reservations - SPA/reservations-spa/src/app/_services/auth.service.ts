import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt'
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { ResetPassword } from '../_models/ResetPassword';

export interface LoginResponse{
    jwtToken:string;
    refreshToken:string;
} 

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    user = new ReplaySubject<User>();

    private expTimer:any;
    baseUrl = `${environment.apiUrl}`;
    jwtHelper = new JwtHelperService();
    decodedToken:any;
    
    constructor(private http: HttpClient, private router:Router){
    console.log("authservice");
    }


    logOut(){
        console.log("LOGOUT");
        this.user.next(null);
        console.log("LOGOUT");
        this.router.navigate(['/home']);
        localStorage.removeItem('data');
        if(this.expTimer){
            clearTimeout(this.expTimer);
        }
        this.expTimer = null;
    }

    login(model:any){
        console.log("login");
        return this.http.post<LoginResponse>(`${this.baseUrl}login/`, model).pipe(
            catchError(this.handleError),
            tap((response:LoginResponse) =>{
                this.decodedToken = this.jwtHelper.decodeToken(response.jwtToken);
                
                const expDate = new Date(new Date().getTime() + +this.decodedToken['exp']).getTime();
                const userId = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
                console.log("curr user id" + userId);
                const userRole = this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                const userName = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
                
                let currentUser = new User(userName,userId,response.jwtToken,expDate,response.refreshToken);
                console.log("behvalue");
                this.user.next(currentUser);
                console.log(this.user);
                // this.refreshToken(expDate);
                localStorage.setItem('data', JSON.stringify(currentUser));
                console.log(JSON.stringify(currentUser));
                console.log(currentUser);
                console.log(expDate);
                console.log("end LOGIN");
            }),
        )
    }

    loginAfterRefresh(){
        const data:{
            name:string, 
            id:string,
            _token:string,
            _tokenExpirationDate:string,
            _resreshToken:string
        } = JSON.parse(localStorage.getItem('data'));
        console.log("LOGIN AFTER REFRESH - before data");
        console.log(data);
        if(!data){
            return;
        }

        let currentUser = new User(data.name, data.id, data._token,new Date(data._tokenExpirationDate).getTime(), data._resreshToken);
        if(currentUser.token){
            this.user.next(currentUser);
            console.log("LOGIN AFTER REFRESH");
            const timeLeft = new Date(data._tokenExpirationDate).getTime() - new Date().getTime();
            // this.refreshToken(timeLeft);
        }
    }

    refreshToken(expTime:number){
        this.expTimer = setTimeout(()=>{
            this.logOut();
        }, expTime*1000)
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