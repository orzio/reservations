import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { OfficeService } from 'src/app/_services/office.service';
import { Office } from 'src/app/_models/Office';
import { CommunicationService } from 'src/app/_services/communcation.service';
import { Desk } from 'src/app/_models/desk';
import { DeskService } from 'src/app/_services/desk.service';




@Injectable({providedIn:'root'})
export class DeskResolverService implements Resolve<Desk[]>{

    constructor(private deskService:DeskService, private officeService:OfficeService, private communicationService: CommunicationService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        let desks:Desk[]=[];
        let office = this.officeService.getOfficeById(route.params['id']);

            this.officeService.fetchUserOffices().subscribe((resp) => {
                //console.log("jestesm w fetch subscribe");
                office = this.officeService.getOfficeById(route.params['id']);
                //console.log("wychodze z fetch");
                desks = office.desks;
                this.deskService.setDesks(desks); 
            })
            return desks;
    }

}