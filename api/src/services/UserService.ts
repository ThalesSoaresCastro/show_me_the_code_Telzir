import prismaClient from "@/prisma";

import bcrypt from 'bcryptjs';

interface IUser {
    nome: string;
    email:string;
    password: string;
}

interface IUserReturn {
    id?: string;
    nome?: string;
    email: string;
    password?:string;
    create_at?: Date;
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

        let userResult:IUserReturn;

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

            userResult = element;
            //Password não será retornado
            delete userResult.password;

            return {'message': 'New user created.', user: userResult};
        }
        userResult = element;
        //Password não será retornado
        delete userResult.password;

        return {'message': 'User already exists.', user: userResult};
    }

    async updateUser(update_user: IUser, userId: string){
        let element:IUser | any;
        let userResult:IUserReturn;

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
            userResult = element;
            //Password não será retornado
            delete userResult.password;
            return {'message': 'Success on changing user.', user: userResult};
        }catch(error){
            console.log('error: ', error);
        }
        userResult = element;
        //Password não será retornado
        delete userResult.password;
        return {'message': 'Error in update user.', user:userResult};
    }

    async findAllUsers(){
        let elements = await prismaClient.user.findMany();

        let arrayUserResult:Array<IUserReturn>;

        if(elements.length > 0){
            arrayUserResult = elements;

            arrayUserResult.map(element => {
                delete element.password
            });

            return {'message': 'All users.' , user:arrayUserResult};
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
            let userResult:IUserReturn = element;
            //Password não será retornado
            delete userResult.password;
            return { 'message':'User exists.', user: userResult };
        }
        
        return {'message': 'User not exists', user:element };
    }

    async deleteUser(id: string){

        let userResult:IUserReturn;

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
            userResult = element;
            //Password não será retornado
            delete userResult.password;
            return {'message': 'Success on deleting user.', user: userResult};
        }
        return {'message': 'User not exists', user: element};
    }
}

export default new UserService();