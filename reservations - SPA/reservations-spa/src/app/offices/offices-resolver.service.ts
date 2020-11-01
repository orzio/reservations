import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Office } from '../_models/Office';

import { DataStorageService } from '../_repositories/offices-storage.service';
import { OfficeService } from '../_services/office.service';

@Injectable({providedIn:'root'})
export class OfficeResolverService implements Resolve<Office[]>{

    constructor(
        private dataStorageService:DataStorageService,
        private officeService:OfficeService
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const offices = this.officeService.getOffices();

        if(offices.length == 0){
            console.log("dupa");
            let item =  this.dataStorageService.fetchOffices();
            console.log(item);
            return item;
        }
           return offices;

    }

}