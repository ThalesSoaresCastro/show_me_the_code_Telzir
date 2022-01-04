import prismaCLient from '@/prisma';
import bcrypt from 'bcryptjs';

interface IUser {
    nome: string;
    password: string;
    email: string;
}
const salt:number = 8; 

const createUserTest = async()=>{
    const userTest:IUser = {
        nome: "teste",
        email: "teste@mail.com",
        password:bcrypt.hashSync("password", salt)
    }
    return await prismaCLient.user.create({data:userTest});
}

export default createUserTest;