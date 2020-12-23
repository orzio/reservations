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
        console.log("city resolver");
        this.addressService.fetchCities().subscribe((response:City[]) =>{
            try{
                cities = response;
            } catch(e){
                cities =[];

            }
        })
        return cities;
    }
}