import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Office } from '../_models/Office';

import { OfficeService } from '../_services/office.service';

@Injectable({providedIn:'root'})
export class OfficeResolverService implements Resolve<Office[]>{

    constructor(
        private officeService:OfficeService
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

            let offices:Office[]=[];
            this.officeService.fetchUserOffices().subscribe((response:Office[])=>{
                //console.log(offices);
                offices = response;
                this.officeService.officesChanged.next(offices.slice());
                
            });
            return offices;

    }

}