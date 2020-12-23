export class Reservation{
    constructor( 
      public id:string, 
      public userId: string,
      public deskId:string,
      private startDate:Date,
      private endDate:Date
    ){}
}
