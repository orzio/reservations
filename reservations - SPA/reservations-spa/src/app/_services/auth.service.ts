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

export interface RefreshTokenCommand{
    userId:string;
    refreshToken:string;
    expiredToken:string;
} 

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private expTimer:any;
    baseUrl = `${environment.apiUrl}`;
    private refToken:string;
    jwtHelper = new JwtHelperService();
    decodedToken:any;
    
    constructor(private http: HttpClient, private router:Router){
    }


    getNewToken(){
        const data:{
            name:string, 
            id:string,
            _token:string,
            _tokenExpirationDate:string,
            _resreshToken:string
        } = JSON.parse(localStorage.getItem('data'));
       
        let refreshCommand = {
            userId : data.id,
            refresh:data._resreshToken,
            expiredToken: data._token
        }

        this.http.post<LoginResponse>(`http://localhost:44310/refreshtoken/`, refreshCommand).subscribe(
            (response:LoginResponse)=>{
                this.setUserData(response);
            }
        )
        
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
        return this.http.post<LoginResponse>(`${this.baseUrl}login/`, model).pipe(
            catchError(this.handleError),
            tap((response:LoginResponse) =>{
                this.setUserData(response);
            }),
        )
    }


    setUserData(response:LoginResponse){
        this.decodedToken = this.jwtHelper.decodeToken(response.jwtToken);
        const expDate = new Date(new Date().getTime() + +this.decodedToken['exp']).getTime();
        const userId = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        const userRole = this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const userName = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        
        let currentUser = new User(userName,userId,response.jwtToken,expDate,response.refreshToken,userRole);
        this.user.next(currentUser);
        localStorage.setItem('data', JSON.stringify(currentUser));
    }


    loginAfterRefresh(){
        const data:{
            name:string, 
            id:string,
            _token:string,
            _tokenExpirationDate:string,
            _resreshToken:string
        } = JSON.parse(localStorage.getItem('data'));
        if(!data){
            return;
        }

        this.decodedToken = this.jwtHelper.decodeToken(data._token);
        const userRole = this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        let currentUser = new User(data.name, data.id, data._token,new Date(data._tokenExpirationDate).getTime(), data._resreshToken, userRole);
        if(currentUser.token){
            this.user.next(currentUser);
            const timeLeft = new Date(data._tokenExpirationDate).getTime() - new Date().getTime();
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