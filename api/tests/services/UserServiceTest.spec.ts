import UserService from "@/services/UserService";

import { prismaMock } from "@/SingletonMock";


interface IUserMock {
    id: string;
    nome: string;
    password: string;
    email:string;
    create_at: Date | any;
}

interface IUser {
    nome: string;
    email:string;
    password: string;
}

describe('Test UserService', ()=>{

    //afterAll(async()=>{
    //    await prismaMock.user.deleteMany();
    //    console.log("Deleted all elements.");
    //});

    test('test', () =>{
        expect((2+2)).toEqual(4);
    })

});