export class RoomReservation{
  public status:number

    constructor( 
      public id:string, 
      public userId: string,
      public roomId:string,
      private startDate:Date,
      private endDate:Date,
    ){}
}
