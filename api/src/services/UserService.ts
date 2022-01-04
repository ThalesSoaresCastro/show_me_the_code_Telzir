import prismaClient from "@/prisma";

import bcrypt from 'bcryptjs';

interface IUser {
    nome: string;
    email:string;
    password: string;
}



const salt:number = 8; 

class UserService {
    async newUser(new_user: IUser){
        //verifica se o elemento já existe no bd
        let element = await prismaClient.user.findFirst({
            where:{
                OR:[
                    {email: new_user.email},
                    {password: new_user.password}
                ]
            }
        })
        if(!element){
            let elementEncrypt:IUser = {
                nome:new_user.nome,
                email: new_user.email,
                password:bcrypt.hashSync(new_user.password, salt)
            };
            
            /*element = await prismaClient.user.create({
                data:{
                    nome: new_user.nome,
                    email: new_user.email,
                    password: new_user.password
                }
            })*/
            element = await prismaClient.user.create({
                data:elementEncrypt
            })

            return {'message': 'New user created.', user: element};
        }
        return {'message': 'User already exists.', user: element};
    }

    async updateUser(update_user: IUser, userId: string){
        let element:IUser | any;

        element = await prismaClient.user.findFirst({
            where:{
                id: userId
            }
        });

        if(!element){
            return {'message': 'User not exists.', user: element};
        }

        try{
            element = await prismaClient.user.update({
                where:{
                    id: userId,
                },
                data:{
                    nome: update_user.nome,
                    email: update_user.email,
                    password: update_user.password
                }
            })

            return {'message': 'Success on changing user.', user: element};
        }catch(error){
            console.log('error: ', error);
        }
        return {'message': 'Error in update user.', user:element};
    }

    async findAllUsers(){
        let elements = await prismaClient.user.findMany();
        if(elements.length > 0){
            return {'message': 'All users.' , user:elements};
        }else{
            return {'message': 'There are no registered users.', user: elements};
        }
    }

    async findOneUser(id: string){
        let element = await prismaClient.user.findFirst({
            where: {
                id: id
            }
        });
        if(element){
            return { 'message':'User exists.', user: element };
        }
        
        return {'message': 'User not exists', user:element };
    }

    async deleteUser(id: string){
        let element = await prismaClient.user.findFirst({
            where: {
                id: id
            }
        });
        if(element){
            await prismaClient.user.delete({
                where:{
                    id: id
                }
            })
            return {'message': 'Success on deleting user.', user: element};
        }
        return {'message': 'User not exists', user: element};
    }
}

export default new UserService();