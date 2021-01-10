import { Room } from './room';
import { Address } from './Address';


export class RoomOfficeReservation{
    public id:string;
    public roomDto: Room;
    public officeAddress:Address;
    public officeName:string;
    public startDate:Date;
    public endDate:Date;
    public status:number;
    public officePhoneNumber:string;
    public officeEmail:string;


    constructor(id:string, room:Room, officeName:string, officeAddress:Address, startDate:Date, endDate:Date,officePhoneNumber:string, officeEmail:string) {
        this.id =id;
        this.roomDto=room;
        this.officeAddress =officeAddress;
        this.officeName=officeName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.officePhoneNumber = officePhoneNumber;
        this.officeEmail = officeEmail;
    }
}