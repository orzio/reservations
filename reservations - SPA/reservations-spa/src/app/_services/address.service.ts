import { Injectable } from '@angular/core';
import { City } from '../_models/City';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { templateJitUrl } from '@angular/compiler';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class AddressService {
  constructor(private http:HttpClient){}


  citiesChanged = new Subject<City[]>();
  private readonly API_URL:string = 'http://localhost:44310/cities';
  private cities:City[]=[];

  getCities():City[]{
    return this.cities.slice();
  }
    
  

    fetchCities():Observable<City[]>{
       return this.http.get<City[]>(this.API_URL)
       .pipe(
         tap(cities =>{
           this.setCities(cities);
         })
       )
    }

  setCities(cities: City[]) {
    this.cities = cities;
    this.citiesChanged.next(this.cities.slice());
    //console.log("set cities");
    //console.log(this.cities);
  }
    
}
