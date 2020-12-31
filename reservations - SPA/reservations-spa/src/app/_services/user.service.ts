import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt'
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { ResetPassword } from '../_models/ResetPassword';
import { AuthService } from './auth.service';
import { UpdateUser } from '../_models/UpdateUser';
import { ChangePassword } from '../user-profile/user-profile.component';


@Injectable({
    providedIn: 'root'
  })
export class UserService {

    currentUser:User;
    constructor(private http:HttpClient, private authService:AuthService){}

    updateUser(updateUser:UpdateUser){
        return this.http.put(`http://localhost:44310/users/${updateUser.id}`,updateUser);
    }
    
    changePassword(changePassword:ChangePassword){
        return this.http.post(`http://localhost:44310/changepassword`,changePassword);
    }

}
