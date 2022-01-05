import React,{ createContext, useState, useEffect } from "react";

import { AuthUser } from '../services/TelzirApiService';

import {setCookie, parseCookies} from 'nookies';

import Router from 'next/router'


interface IUser{
    id?:string;
    nome?: string;
    email?: string;
    created_at?: Date;
}

interface ILogin{
    email: string;
    password: string;
}

interface AuthContextData{
    signed: boolean;
    user:IUser | null;
    signIn: (login:ILogin) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const [user,setUser] = useState<object | null>(null);
    //const [token, setToken] = useState('');
    /*
        useEffect(()=>{
        async function fetchUser() {
            const { 'nextpaladorapp.token':token } = parseCookies()
            if(token){
                const resp = await userByToken({token:token})
                if(resp.status === 200){
                    //console.log('data: ', resp.data.data)
                    setUser(resp.data.data)
                }
            }
        }
        fetchUser()
    },[])
    */

    async function signIn(login: ILogin) {
        const response = await AuthUser(login);

        if(response.status === 200){            
            setUser(response.data.data.user)
            setCookie(undefined, 
                'nextpaladorapp.token', 
                response.data.data.token,
                {
                    maxAge:60*60*3, //duração do token de 3 horas
                }
            )
            Router.push('/dashboard');
        }else{
            alert('Email e/ou senha incorretos!');
        }
        

    }

    return(
        <AuthContext.Provider
        value={{ signed:!!user, user:user, signIn}}
      >  
        {children}
      </AuthContext.Provider>
    );
  }
  
export default AuthContext;