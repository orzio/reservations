export class RoomReservationForManager{
    public status:number
  
      constructor( 
        public id:string, 
        public userId: string,
        public roomId:string,
        public startDate:Date,
        public endDate:Date,
        public userName:string,
        public roomName:string,
        public officeName:string
      ){}
  }
  