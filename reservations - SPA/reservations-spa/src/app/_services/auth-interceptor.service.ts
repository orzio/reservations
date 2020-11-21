import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpParams, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){}

 intercept(req: HttpRequest<any>, next: HttpHandler) {
    //     console.log("interceptor");
    //    return this.authService.user.pipe(
    //        take(1),
    //        exhaustMap(user =>{
               
    //            console.log(user);
    //         if(!user){
    //             console.log("interceptor");
            return next.handle(req);
    //         }

    //            const modifiedRequest = req.clone({
    //                params: new HttpParams().set('auth', user.token)
    //             })
    //            return next.handle(modifiedRequest);
    //        })
    //    )
    }
     
}