import api from '../api/TelzirApi';

type ElementCost = {
    origin: string;
    destiny: string;
    plan: number;
    time: number;
}

type Login = {
    email:string;
    password:string;
}

export const GetAllElements = async() =>{
    return await api.get('/allelements')
                .then( (response: any) =>{
                    return response;
                })
                .catch((error: any) =>{ return error });
}


export const CostEstimative = async(element: ElementCost)=>{
    return await api.post('/cost', element)
    .then( (response:any) =>{
        return response
    })
    .catch((error:any) =>{ return error });
}


export const AuthUser = async(login: Login)=>{

    console.log('login: ',login);
    return await api.post('/auth', login)
            .then( (response:any) =>{
                return response
            })
            .catch((error:any) =>{ return error });
}