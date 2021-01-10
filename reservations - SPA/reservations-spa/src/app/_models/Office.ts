import { Address } from './Address';
import { Desk } from './desk';
import { Room } from './room';

export class Office{
    public id:string;
    public userId:string;
    public name: string;
    public address:Address;
    public rooms:Room[];
    public email:string;
    public desks:Desk[];
    public description:string;
    public phoneNumber:string;

    constructor(name:string,address:Address,rooms:Room[],desks:Desk[],description:string, email:string, phoneNumber:string){
        this.name = name;
        this.address = address;
        this.rooms = rooms;
        this.desks = desks;
        this.description = description;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}