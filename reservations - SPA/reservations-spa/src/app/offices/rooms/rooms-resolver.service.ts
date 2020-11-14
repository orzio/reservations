import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Room } from 'src/app/_models/room';
import { RoomService } from 'src/app/_services/room.service';
import { OfficeService } from 'src/app/_services/office.service';
import { Office } from 'src/app/_models/Office';
import { CommunicationService } from 'src/app/_services/communcation.service';




@Injectable({providedIn:'root'})
export class RoomResolverService implements Resolve<Room[]>{

    constructor(private roomService:RoomService, private officeService:OfficeService, private communicationService: CommunicationService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        this.communicationService.roomsClicked.next(true);
        let rooms:Room[]=[];
        var office = this.officeService.getOfficeById(+route.params['id']);

            this.officeService.fetchOffices().subscribe((resp) => {
                office = this.officeService.getOfficeById(+route.params['id']);
                rooms = office.rooms;
                this.roomService.setRooms(rooms); 
            })
            return rooms;
    }

}