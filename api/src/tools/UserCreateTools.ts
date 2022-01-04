import prismaCLient from '@/prisma';
import bcrypt from 'bcryptjs';
import app from '@/index';
import request from 'supertest';
interface IUser {
    nome: string;
    password: string;
    email: string;
}
const salt:number = 8; 

interface ILoginUser {
    email: string;
    password: string;
}

class UserCreateTools {
    userTest: IUser;
    userLogin: ILoginUser;
    constructor() {
        this.userTest = <IUser>{
            nome:"teste",
            email:"teste@mail.com",
            password:bcrypt.hashSync("password", salt)
        }

        this.userLogin = <ILoginUser>{
            email:"teste@mail.com",
            password:"password"
        }
    }

    async createUserTest(){

        console.log('chamando função....\n');
        let dataCreated = await prismaCLient.user.create({data:this.userTest});
        return dataCreated;
    }
    
    async authUserTest(){
        const response = await request(app)
                            .post("/auth")
                            .send(this.userLogin);
    
        return response.body.data;
    }
}

export default new UserCreateTools();
