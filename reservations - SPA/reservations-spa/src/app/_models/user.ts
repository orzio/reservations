export class User{
    constructor( 
      public name: string,
      public id:string,
      private _token:string,
      private _tokenExpirationDate:number,
      private _resreshToken:string,
      private _role:string
    )
    {}
    get token(){
        if(!this._tokenExpirationDate || new Date().getTime() > this._tokenExpirationDate ){
            console.log("token to null");
            return null;
        }
        console.log("token nie null");
        return this._token;
    }

    get role(){
        return this._role;
    }
}
