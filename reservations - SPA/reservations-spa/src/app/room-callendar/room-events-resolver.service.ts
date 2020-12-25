import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute, Params, Router } from '@angular/router';
import { ReservationDto } from '../_models/ReservationDto';
import { RoomReservationService } from '../_services/roomReservation.Service';




@Injectable({providedIn:'root'})
export class RoomEventsResolverService implements Resolve<ReservationDto[]>{

    private roomId:string="";
    constructor(private reservationService:RoomReservationService, private activatedRoute:ActivatedRoute, private router:Router){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
       this.roomId =  route.params['roomId'];
       console.log("roomek"+this.roomId);

        let events:ReservationDto[]=[];
            this.reservationService.fetchRoomReservations(this.roomId).subscribe((resp:ReservationDto[]) => {
                events = resp;
                this.reservationService.setRoomReservations(events)
                this.reservationService.currentRoomIdChanged.next(this.roomId);
            })
            return events;
    }

}