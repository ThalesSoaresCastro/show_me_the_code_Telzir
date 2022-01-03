import type { NextPage } from 'next'
import Router from 'next/router';


import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


import InfoIcon from '@mui/icons-material/Info';

type ElementCost = {
  origin: string;
  destiny: string;
  plan: number;
  time: number;
}

type Props = {
    children?:React.ReactNode;
}

const PrincipalViewComponent: React.FC<Props>= ({children}) => {
  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        //background:'linear-gradient(0deg, rgba(54,91,208,1) 8%, rgba(16,9,121,1) 69%)',
        background:'linear-gradient(0deg, rgba(255,255,255,1) 45%, rgba(23,194,196,1) 80%)', 
        height:'100vh' 
      }} 
      display="flex" 
      flexDirection="column"
      alignItems="center"
    >
      <AppBar 
        position="static"
        sx={{background: '#0aadaf'}} 
      >
        <Toolbar >
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                color:"white"
                }}
                onClick={()=>{
                  Router.push('/');
                }}
            >
              Telzir
            </Typography>

            <InfoIcon
              sx={{ fontSize: 35 }} 
              onClick={()=>{
                Router.push('tableView');
              }}
            />

        </Toolbar>
      </AppBar>
      <Container
        maxWidth='sm'
        sx={{
          backgroundColor:'transparent',
          height:'60%',
        }}
      >

        {children}

      </Container>
    </Box>
  )
}

export default PrincipalViewComponent;
