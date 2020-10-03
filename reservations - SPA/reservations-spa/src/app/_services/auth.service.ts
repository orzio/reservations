import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt'
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
                    localStorage.setItem('token', user.jwtToken);
                    localStorage.setItem('user', JSON.stringify(user.user));
                    this.decodedToken = this.jwtHelper.decodeToken(user.token);
                    this.currentUser = user.user;
                    console.log(this.decodedToken);
                }
            })
        )
    }

    register(user:User):Observable<Object>{
        return this.http.post(`${this.baseUrl}users`,user);
    }
}