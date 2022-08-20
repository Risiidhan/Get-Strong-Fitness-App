import { Users } from "./users";

export class Admin extends Users{
    
   constructor(
    public username: string,
    public fullName: string,
    public gender: string,
    public age : number,
    public address : string,
    public contactNo: number,
    public password: string,
   ){
       super(
        username,
        fullName,
        gender,
        age,
        address,
        contactNo,
        password
        )
   } 
}
