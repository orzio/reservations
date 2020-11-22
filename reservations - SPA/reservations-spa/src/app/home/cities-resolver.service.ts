import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AddressService } from '../_services/address.service';
import { City } from '../_models/City';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class CityResolverService implements Resolve<City[]>{
    constructor(
        private addressService:AddressService
    ){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let cities: City[];
        this.addressService.fetchCities().subscribe((response:City[]) =>{
            console.log("city resolver");
            cities = response;
            cities.forEach(x =>console.log(x.name));
            cities.forEach(x =>console.log(x));
        })
        return cities;
    }
}