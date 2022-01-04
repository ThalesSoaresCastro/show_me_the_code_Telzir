import app from './index';
import AddDataBD from '@/tools/addData';

import dotenv from 'dotenv';
dotenv.config(); 

const PORT = 5050; 

const funcAdd = async()=>{
    console.log('chamando função para adicionar dados...\n');
    await AddDataBD();
}


if(process.env.NODE_ENV !== 'test'){
    try{
        app.listen( ( Number(process.env.API_PORT) | PORT ) , ()=>{
            console.log(`Server run in http://localhost:${process.env.API_PORT}!\n`);
        });
        funcAdd();
    }catch(error:any){
        console.log(`Error occured: ${error.message}`);
    }
}
