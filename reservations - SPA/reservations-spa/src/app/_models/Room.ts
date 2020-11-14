export class Room{
    public id:string;
    public name:string;
    public officeId:string;
    public description:string;
    public seats:number;
    public hasTV:boolean;
    public hasWhiteBoard:boolean;
    public hasProjector:boolean;
    public otherEquipment:string;

    constructor(id:string, name:string, officeId:string,description:string,seats:number, hasTV:boolean, hasWhiteBoard:boolean,hasProjector:boolean,otherEquipment:string){
        this.id=id;
        this.name=name;
        this.officeId=officeId;
        this.description=description;
        this.seats=seats;
        this.hasTV=hasTV;
        this.hasWhiteBoard=hasWhiteBoard;
        this.hasProjector=hasProjector;
        this.otherEquipment=otherEquipment;
    }
} 