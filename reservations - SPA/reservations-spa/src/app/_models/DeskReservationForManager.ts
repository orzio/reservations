export class DeskReservationForManager{
    public status:number
  
      constructor( 
        public id:string, 
        public userId: string,
        public deskId:string,
        public startDate:Date,
        public endDate:Date,
        public userName:string,
        public deskName:string,
        public officeName:string
      ){}
  }
  