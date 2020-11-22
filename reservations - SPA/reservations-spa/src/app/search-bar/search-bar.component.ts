import { Component, OnInit } from '@angular/core';
import { City } from '../_models/City';
import { AddressService } from '../_services/address.service';
import { Office } from '../_models/Office';
import { OfficeService } from '../_services/office.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  cities:City[];
  initialCity:string="Wybierz Miasto";
  selectedCity:string="Wybierz Miasto";
  selectedPlace:string="Biurko/Sala";
  constructor(private addressService:AddressService, private officeService:OfficeService,
    private router:Router) { }

  ngOnInit(): void {
    this.cities = this.addressService.getCities();
    this.addressService.citiesChanged.subscribe((cities :City[])=>{
      this.cities = cities;
    });
  }


  onSubmit(){

    this.officeService.fetchOfficesDesksInCity(this.selectedCity).subscribe(()=>{
      console.log("szukaj - searchbar");
      console.log(this.officeService.getOffices());
      this.router.navigate(['/offices/desks/city']);
    })
  }
  


}
