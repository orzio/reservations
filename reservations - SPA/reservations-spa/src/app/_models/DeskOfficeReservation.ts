import { Desk } from './desk';
import { Address } from './Address';


export class DeskOfficeReservation{
    public id:string;
    public deskDto: Desk;
    public officeAddress:Address;
    public officeName:string;
    public startDate:Date;
    public endDate:Date;
    public status:number


    constructor(desk:Desk, officeName:string, officeAddress:Address, startDate:Date, endDate:Date) {
        this.deskDto=desk;
        this.officeAddress =officeAddress;
        this.officeName=officeName;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}