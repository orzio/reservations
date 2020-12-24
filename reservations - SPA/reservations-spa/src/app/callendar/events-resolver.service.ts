import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute, Params, Router } from '@angular/router';

import { OfficeService } from 'src/app/_services/office.service';
import { CommunicationService } from 'src/app/_services/communcation.service';
import { ReservationDto } from '../_models/ReservationDto';
import { ReservationService } from '../_services/reservation.service';




@Injectable({providedIn:'root'})
export class EventsResolverService implements Resolve<ReservationDto[]>{

    private deskId:string="";
    constructor(private reservationService:ReservationService, private activatedRoute:ActivatedRoute, private router:Router){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
       this.deskId =  route.params['deskId'];

        let events:ReservationDto[]=[];
            this.reservationService.fetchDeskReservations(this.deskId).subscribe((resp:ReservationDto[]) => {
                events = resp;
                this.reservationService.setDeskReservations(events)
            })
            return events;
    }

}