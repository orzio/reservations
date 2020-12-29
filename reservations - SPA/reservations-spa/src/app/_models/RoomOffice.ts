import { Address } from './Address';
import { Room } from './room';


export class RoomOffice{
    public room: Room;
    public officeName:string;
    public officeAddress:Address;

    constructor(room:Room, officeName:string, officeAddress:Address) {
        this.room=room;
        this.officeAddress =officeAddress;
        this.officeName=officeName;
    }
}