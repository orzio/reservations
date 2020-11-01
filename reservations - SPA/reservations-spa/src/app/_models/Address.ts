export class Address{
    public id:number;
    public street:string;
    public city:string;
    public zipCode:string;
    
    constructor(id:number, street:string, city:string, zipCode:string){
        this.id = id;
        this.street = street;
        this.city = city;
        this.zipCode = zipCode;
    }
}