import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute, Params, Router } from '@angular/router';
import { ReservationDto } from '../_models/ReservationDto';
import { DeskReservationService } from '../_services/deskReservation.service';




@Injectable({providedIn:'root'})
export class DeskEventsResolverService implements Resolve<ReservationDto[]>{

    private deskId:string="";
    constructor(private reservationService:DeskReservationService, private activatedRoute:ActivatedRoute, private router:Router){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
       this.deskId =  route.params['deskId'];

        let events:ReservationDto[]=[];
            this.reservationService.fetchDeskReservations(this.deskId).subscribe((resp:ReservationDto[]) => {
                events = resp;
                this.reservationService.setDeskReservations(events);
                this.reservationService.currentDeskIdChanged.next(this.deskId);
            })
            return events;
    }

}