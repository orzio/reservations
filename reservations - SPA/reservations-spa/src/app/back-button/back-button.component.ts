import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {

  constructor(private router:Router) { }

  @Input() Label:string="";
  ngOnInit(): void {
  }


  navigateHome(){
    this.router.navigate(['/']);
  }

}
