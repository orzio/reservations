import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt'
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginResponse{
    jwtToken:string;
    refreshToken:string;
} 

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    user = new BehaviorSubject<User>(null);

    private expTimer:any;
    baseUrl = `${environment.apiUrl}`;
    jwtHelper = new JwtHelperService();
    decodedToken:any;
    
    constructor(private http: HttpClient, private router:Router){
    console.log("authservice");
    }


    logOut(){
        this.user.next(null);
        this.router.navigate(['/home']);
        localStorage.removeItem('data');
        if(this.expTimer){
            clearTimeout(this.expTimer);
        }
        this.expTimer = null;
    }

    login(model:any){
        console.log("lofin");
        return this.http.post<LoginResponse>(`${this.baseUrl}login/`, model).pipe(
            catchError(this.handleError),
            tap((response:LoginResponse) =>{
                this.decodedToken = this.jwtHelper.decodeToken(response.jwtToken);
                
                const expDate = new Date(new Date().getTime() + +this.decodedToken['exp']).getTime();
                const userId = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
                const userRole = this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                const currentUser = new User(userId,response.jwtToken,expDate,response.refreshToken);
                
                this.user.next(currentUser);
                this.refreshToken(expDate);
                localStorage.setItem('data', JSON.stringify(currentUser));
                console.log(currentUser);
                console.log(expDate);
            }),
        )
    }

    loginAfterRefresh(){
        const data:{
            id:string,
            _token:string,
            _tokenExpirationDate:string,
            _resreshToken:string
        } = JSON.parse(localStorage.getItem('data'));
        if(!data){
            return;
        }

        const currentUser = new User(data.id, data._token,new Date(data._tokenExpirationDate).getTime(), data._resreshToken);
        if(currentUser.token){
            this.user.next(currentUser);
            const timeLeft = new Date(data._tokenExpirationDate).getTime() - new Date().getTime();
            this.refreshToken(timeLeft);
        }
    }

    refreshToken(expTime:number){
        this.expTimer = setTimeout(()=>{
            this.logOut();
        }, expTime)
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