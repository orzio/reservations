export class Desk{
    public name:string;
    public id:string;
    public officeId:string;
    public seats:number;

    constructor(name:string, id:string, officeId:string, seats:number) {
        this.name = name;
        this.id = id;
        this.officeId = officeId;
        this.seats = seats;
    }
}