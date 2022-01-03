import type { NextPage } from 'next';
import React,
{
  useContext,
} from 'react';

import Typography from '@mui/material/Typography';

type ElementCost = {
  origin: string;
  destiny: string;
  plan: number;
  time: number;
}

import PrincipalViewComponent from '../components/PrincipalViewComponent';
import OptionsComponent from '../components/OptionsComponent';

const Home: NextPage = () => {

  return (
    <PrincipalViewComponent>
      <>
      <Typography 
            variant="subtitle1"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            color="white"
            marginTop={'20%'}
        >
            O Aplicativo permite o cáculo do valor da tarifa por minuto da ligação com e sem um dos planos a sua escolha.
        </Typography>
        
        <OptionsComponent
        />
        </>
    </PrincipalViewComponent>
  )
}

export default Home
