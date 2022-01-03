import api from '../api/TelzirApi';

type ElementCost = {
    origin: string;
    destiny: string;
    plan: number;
    time: number;
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