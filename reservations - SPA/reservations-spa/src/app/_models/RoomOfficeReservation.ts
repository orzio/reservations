import { Room } from './room';
import { Address } from './Address';


export class RoomOfficeReservation{
    public id:string;
    public roomDto: Room;
    public officeAddress:Address;
    public officeName:string;
    public startDate:Date;
    public endDate:Date;


    constructor(id:string, room:Room, officeName:string, officeAddress:Address, startDate:Date, endDate:Date) {
        this.id =id;
        this.roomDto=room;
        this.officeAddress =officeAddress;
        this.officeName=officeName;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}