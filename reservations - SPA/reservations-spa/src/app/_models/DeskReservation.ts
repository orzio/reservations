export class DeskReservation{
    constructor( 
      public id:string, 
      public userId: string,
      public deskId:string,
      private startDate:Date,
      private endDate:Date
    ){}
}
