import { Address } from './Address';
import { Room } from './room';


export class RoomOffice{
    public room: Room;
    public officeName:string;
    public officeAddress:Address;
    public phoneNumber:string;
    public email:string;

    constructor(room:Room, officeName:string, officeAddress:Address, phoneNumber:string, email:string) {
        this.room=room;
        this.officeAddress =officeAddress;
        this.officeName=officeName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}