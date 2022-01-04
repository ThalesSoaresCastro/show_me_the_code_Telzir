import prismaCLient from '@/prisma';
import request from 'supertest';
import app from '@/index';
import UserCreateTools from "@tools/UserCreateTools";

interface IUser {
    nome: string;
    password: string;
    email: string;
}

interface ILoginUser {
    email: string;
    password: string;
}

const salt:number = 8; 

describe('Test AuthService', ()=>{

    beforeAll(async()=>{
        //chamando função para criar usuário
        //await createUserTest;
        await UserCreateTools.createUserTest();
        console.log("User Created.");
        //console.log('OBJ: ', obj);
    });

    afterAll(async()=>{
        await prismaCLient.user.deleteMany();    
        console.log("Deleted all elements.");
        await prismaCLient.$disconnect();
    });

    
    test('Auth Element Success', async()=>{

        const userLogin:ILoginUser = {
            email: "teste@mail.com",
            password:"password"
        }

        //let value = await prismaCLient.user.create({data:userTest});
        //console.log('USER-FIND: ', userFind);


        let result = await request(app)
                           .post("/auth")
                           .send(userLogin);
        
        //console.log('Result: ', result.body);

        expect(result.statusCode).toEqual(200);
        expect(result.body.message).toEqual('Success login');
        expect(result.body.data.user.email).toEqual(userLogin.email);

    });

    test('Auth Element not exists', async()=>{
        const userLogin:ILoginUser = {
            email: "testenotWork@mail.com",
            password:"password",
        }

        let result = await request(app)
                           .post("/auth")
                           .send(userLogin);
        
        expect(result.statusCode).toEqual(401);
        expect(result.body.message).toEqual('Unauthorized user' );
    });

    test('Auth email element is empty', async()=>{
        const userLogin:ILoginUser = {
            email: "    ",
            password:"password",
        }

        let result = await request(app)
                           .post("/auth")
                           .send(userLogin);
        
        expect(result.statusCode).toEqual(422);
        expect(result.body.message).toEqual('Error params.' );
    });

    test('Auth password element is empty', async()=>{
        const userLogin:ILoginUser = {
            email: "teste@mail.com",
            password:"  ",
        }

        let result = await request(app)
                           .post("/auth")
                           .send(userLogin);
        
        expect(result.statusCode).toEqual(422);
        expect(result.body.message).toEqual('Error params.' );
    });

    test('Auth email element is invalid', async()=>{
        const userLogin:ILoginUser = {
            email: "@mail.com",
            password:"password",
        }

        let result = await request(app)
                           .post("/auth")
                           .send(userLogin);
        
        expect(result.statusCode).toEqual(400);
        expect(result.body.message).toEqual('Invalid email, unauthorized user.' );
    });


});