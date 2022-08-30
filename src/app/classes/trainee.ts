import { Users } from "./users";

export class Trainee extends Users{
    constructor(
     public username: string,
     public fullName: string,
     public gender: string,
     public age: number,
     public address: string,
     public contact: number,
     public password: string,
     public height: number,
     public weight: number,
     public exerciseLevel: string
    ){
        super(
         username,
         fullName,
         gender,
         age,
         address,
         contact,
         password
         )
    } 
 }