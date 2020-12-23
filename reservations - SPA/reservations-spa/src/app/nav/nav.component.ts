import { Component, OnInit, OnDestroy, ɵConsole } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  
  isLoggedIn = false;
  isCollapsed: boolean = true;
  private userSubscription:Subscription;
  constructor(private authService:AuthService) { }
  
  ngOnInit(): void {
    console.log('!!!!!!!ng oninit!!!!!!!!');
    this.userSubscription = this.authService.user.subscribe(user =>{
      console.log(":::::::::::::::::::::::::::::::::::::::::::::::::")
      let curruser = user;
      this.isLoggedIn = !!curruser;
      console.log(this.isLoggedIn);
      console.log(":::::::::::::::::::::::::::::::::::::::::::::::::")
    })


    }

    logout(){
      this.authService.logOut();
    }

    
          ngOnDestroy(): void {
            this.userSubscription.unsubscribe();
          }
}
