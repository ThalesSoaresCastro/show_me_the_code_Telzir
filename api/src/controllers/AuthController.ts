import prismaClient from "@/prisma";
import {
    Request,
    Response,
} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Tools from "@/tools/tools";

interface IUser {
    nome?: string;
    email:string;
    password?: string;
}

class AuthController {
    async authenticate (req: Request, res: Response) {
  
      // verificando se email já existe
        const { email, password } = req.body;

        if(!email.trim() || !password.trim()){
            res.status(422).json({ message: 'Error params.' });
            return;
        }

        if( !(await Tools.validation_email(email)) ){
            res.status(400).json({ message: 'Invalid email, unauthorized user.' });
            return;
        }

        const user = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        });

        if (!user) {
            res.status(401).json({ message: 'Unauthorized user' });
            return;
        }
  
        //Resolver problema de criptografar a senha ao add cliente utilizando prisma...

        const isValidPassword = await bcrypt.compare(password, user.password);
  
        if(!isValidPassword) {
            res.status(401).json({ message: 'Unauthorized user, password error' });
            return;
        }
  
        //criando token de autenticação
        const secret:string = process.env.SECRET!;
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1d' });
  
        // excluindo password para envio dos dados
        const userData:IUser = user;
        delete userData.password;
  
        return res.status(200).json({
            message: 'Success login',
            data: {
                user: userData,
                token: token
            }
        });
    }
}
  
export default new AuthController();