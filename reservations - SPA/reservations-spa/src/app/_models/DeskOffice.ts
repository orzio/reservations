import { Desk } from './desk';
import { Address } from './Address';


export class DeskOffice{
    public desk: Desk;
    public officeName:string;
    public officeAddress:Address;

    constructor(desk:Desk, officeName:string, officeAddress:Address) {
        this.desk=desk;
        this.officeAddress =officeAddress;
        this.officeName=officeName;
    }
}