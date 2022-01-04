//---------------------------------------------------------------------------------------------
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config(); 

interface iEnv{
    userDBName: string | any;
    userDBPassword: string | any;
    databaseName: string | any;
    databasePort: string | any;
    dbHost: string | any;
}

const createEnvFile= async() =>{
    let envValues:iEnv = <iEnv>{

    };
    
    if(process.env.NODE_ENV === 'test'){
        envValues.userDBName = process.env.TEST_USER_NAME_DATABASE;
        envValues.userDBPassword = process.env.TEST_USER_PASSWORD_DATABASE;
        envValues.databaseName = process.env.TEST_DATABASE_NAME;
        envValues.databasePort =  process.env.TEST_DATABASE_PORT;
        envValues.dbHost = process.env.TEST_API_DBHOST;
    }
    else{
        envValues.userDBName = process.env.USER_NAME_DATABASE;
        envValues.userDBPassword = process.env.USER_PASSWORD_DATABASE;
        envValues.databaseName = process.env.DATABASE_NAME;
        envValues.databasePort =  process.env.DATABASE_PORT;
        envValues.dbHost = process.env.API_DBHOST;
    }

    let StringConnection = `DATABASE_URL=postgresql://${envValues.userDBName}:${envValues.userDBPassword}@${envValues.dbHost}:${envValues.databasePort}/${envValues.databaseName}?schema=public\n\nSECRET=secret`;
    
    console.log(`STRINGCONNECTION: ${StringConnection}`);

    fs.createWriteStream('./.env').write(StringConnection);
    /*
    await fs.writeFile('.env', StringConection, (err)=>{
        if(err) throw err;
        console.log('Arquivo criado!');
    });
    */

}

createEnvFile();

//-----------------------------------------------------------------------------------------------
