export class ReservationDto{
    constructor( 
      public id:string, 
      public userId:string,
      public title: string,
      public startDate:Date,
      public endDate:Date,
      public status:number
    ){}
}