import { Users } from "./users";

export class Instructor extends Users{
    constructor(
        public username: string,
        public email: string,
        public name: string,
        public gender: string,
        public age : number,
        public address : string,
        public contact: number,
        public password: string,
    ){
        super(
            username,
         email,
         name,
         gender,
         age,
         address,
         contact,
         password
         )
    } 
 }