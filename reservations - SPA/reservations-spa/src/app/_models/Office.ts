export class Office{
    public officeName: string;
    public officeCity: string;
    public officeStreet: string;
    public officeZipCode: string;
    public officeDescription: string;

    constructor(name:string,street:string, city:string,zipcode:string,description:string){
        this.officeName = name;
        this.officeCity = city;
        this.officeStreet = street;
        this.officeZipCode = zipcode;
        this.officeDescription = description;
    }
}