import { Component, OnInit } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AuthInterceptor } from './_services/auth-interceptor.service';
import { AuthService } from './_services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private authService:AuthService){}

  ngOnInit(): void {
  this.authService.loginAfterRefresh();
  }

  title = 'reservations-spa';
}
