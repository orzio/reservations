export class ResetPassword{
    public NewPassword:string;
    public Token:string;

    constructor(newPassword:string,token:string){
        this.NewPassword = newPassword;
        this.Token = token;
    }
}