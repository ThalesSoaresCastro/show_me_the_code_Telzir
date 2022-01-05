import React,{
    useState,
    useContext,
} from 'react';
import {withRouter} from 'next/router';

import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { 
    AuthUser,
  } from '../services/TelzirApiService';

import  AuthContext  from '../contexts/auth';

const Admin: React.FC = () => {

    const [emailValue, SetEmailValue] = useState('');
    const [passwordValue, SetPasswordValue] = useState('');

    const { signIn } = useContext(AuthContext);

    const handleChangeEmail = (event: any) => {
        SetEmailValue(event.target.value);
    }

    const handleChangePassword = (event: any) => {
        SetPasswordValue(event.target.value);
    }

  return(
        <Box
        sx={{ 
            flexGrow: 1,
            height:'100vh',
            backgroundColor:'#f8f8ff',
          }} 
          display="flex" 
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
            <Container
                maxWidth='sm'
                sx={{
                    height: 450,
                    width: 360,
                }}
            >
                <Box
                    display="flex" 
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    marginTop={'4%'}
                    sx={{
                        height:'80%',
                        borderRadius:2,
                        boxShadow:'1px 3px 3px 3px rgba(0, 0, 0, 0.2)',
                        background: 'white'
                    }}
                >
                    <Typography 
                    variant="h2"
                    component="div" 
                    sx={{ 
                        color:"white",
                        textShadow:'-1px 2px rgba(0, 0, 0, 0.2), 0 2px rgba(0, 0, 0, 0.3), 1px 0 rgba(0, 0, 0, 0.3), 0 -1px rgba(0, 0, 0, 0.3)'
                    }}
                    >
                    Telzir
                    </Typography>

                    <Box sx={{ minWidth: '40%' }} padding={1}>
                        <InputLabel id="email-label" sx={{color: 'black'}}>Email</InputLabel>
                        <TextField 
                        id="email-input"
                        value={emailValue}
                        onChange={handleChangeEmail}
                        sx={{background: '#f8f8ff', borderRadius:'4px'}}
                        variant="outlined"
                        />
                    </Box>

                    <Box sx={{ minWidth: '40%' }} padding={1}>
                        <InputLabel id="password-label" sx={{color: 'black'}}>Senha</InputLabel>
                        <TextField 
                        id="password-input"
                        value={passwordValue}
                        onChange={handleChangePassword}
                        sx={{background: '#f8f8ff', borderRadius:'4px'}}
                        variant="outlined"
                        />
                    </Box>

                    <Button 
                        sx={{
                        color:'black', 
                        background: '#f8f8ff', 
                        marginTop:2, 
                        marginBottom:1,
                        boxShadow:'1px 2px 2px 2px rgba(0, 0, 0, 0.1)',
                        }} 
                        onClick={async()=>{
                                //const response = await AuthUser({
                                //    email:emailValue,
                                //    password:passwordValue
                                //})
                                signIn({
                                    email:emailValue,
                                    password:passwordValue
                                })
                                //console.log('Result: ', response.data)
                        }}
                    >
                        Login
                    </Button>

                </Box>

            </Container>

        </Box>

    );
}

export default withRouter(Admin);