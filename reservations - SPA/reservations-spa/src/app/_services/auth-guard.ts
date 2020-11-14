import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(private authService:AuthService){}
    canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.user.pipe(map(user => {
        //this converts not null value to true and null to false
        return !!user;
    }));
    }

}