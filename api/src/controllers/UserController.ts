import {
    Request,
    Response,
} from 'express';

import UserService from "@services/UserService";

interface IUser {
    nome: string;
    email:string;
    password: string;
}


class UserController{
    public async CreateNewUser(req: Request, res: Response){
        const element: IUser = <IUser>req.body;

        if( !element.nome || !element.email || !element.password){
            return res.status(422).json({message: "Param not exists.", user:{} });
        }

        if( !element.nome.trim() || !element.email.trim() || !element.password.trim()){
            return res.status(422).json({message: "Invalid data.", user:{}});
        }
        
        const result = await UserService.newUser(element);

        if(result.message === "User already exists."){
            return res.status(400).json(result);
        }
        return res.status(201).json(result);
    }

    async UpdateUser(req: Request, res: Response){
        const element: IUser = <IUser>req.body;

        if( !element.nome || !element.email || !element.password){
            return res.status(422).json({message: "Param not exists.", user:{}});
        }

        if( !element.nome.trim() || !element.email.trim() || !element.password.trim() ){
            return res.status(422).json({message: "Invalid data.", user:{}});
        }

        const id = req.params.id;
        const result = await UserService.updateUser(element, id);

        if(result && !result.user){
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    }

    async DeleteUser(req: Request, res: Response){
        const id = req.params.id;

        if(!id){
            return res.status(422).json({message: "ID not exists.", user: {}});
        }

        if(!id.trim()){
            return res.status(422).json({message: "Id empty.", user: {}});
        }

        const result = await UserService.deleteUser(id);

        if(!result.user){
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    }

    async FindAllUsers(req: Request, res: Response){

        const result = await UserService.findAllUsers();

        if(!result.user){
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    }

    async FindOneUser(req: Request, res: Response){
        const id = req.params.id;

        if(!id){
            return res.status(422).json({message: "ID not exists.", user: {}});
        }

        const result = await UserService.findOneUser(id);

        if(!result.user){
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    }
}

export default new UserController();