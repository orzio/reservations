import { Component, OnInit, OnDestroy } from '@angular/core';
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
    this.userSubscription = this.authService.user.subscribe(user =>{
      this.isLoggedIn = !!user;
    })
    }

    logout(){
      this.authService.logOut();
    }
          ngOnDestroy(): void {
            this.userSubscription.unsubscribe();
          }

}
