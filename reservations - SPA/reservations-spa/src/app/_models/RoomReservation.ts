export class RoomReservation{
    constructor( 
      public id:string, 
      public userId: string,
      public roomId:string,
      private startDate:Date,
      private endDate:Date
    ){}
}
