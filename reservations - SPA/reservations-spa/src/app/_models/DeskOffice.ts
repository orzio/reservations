import { Desk } from './desk';
import { Address } from './Address';


export class DeskOffice{
    public desk: Desk;
    public officeName:string;
    public officeAddress:Address;
    public phoneNumber:string;
    public email:string;

    constructor(desk:Desk, officeName:string, officeAddress:Address, phoneNumber:string, email:string) {
        this.desk=desk;
        this.officeAddress =officeAddress;
        this.officeName=officeName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}