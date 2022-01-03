import React,{
    useContext,
}from 'react';

// import { Container } from './styles';

import PrincipalViewComponent from '../components/PrincipalViewComponent';
import DataContext from '../contexts/listdata';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import Router from 'next/router';


type ElementResult = {
    origin: string;
    destiny: string;
    plan: number;
    time: number;
    costPlan: number;
    costNotPlan: number;
}

const ResultView: React.FC = () => {

    const { result } = useContext(DataContext);

    const resultItem:ElementResult = result as ElementResult;

    return(
      <PrincipalViewComponent>
            <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                    flexGrow: 1, 
                    color:"white", 
                    textAlign: 'center',
                    marginTop:'20%',
                }}
            >
              Resultado da pesquisa
            </Typography>
          <Box
              display="flex" 
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              marginTop={'10%'}
              sx={{
                borderRadius:1,
                boxShadow:'2px 2px 2px 2px rgba(0, 0, 0, 0.3)',
                background: 'white'
              }}
          >


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: '20%' }} size="small" aria-label="a dense table">
                    <TableBody>
                    {resultItem?(
                    <>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Origem
                            </TableCell>
                            <TableCell>{resultItem.origin}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Destino
                            </TableCell>
                            <TableCell>{resultItem.destiny}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Plano
                            </TableCell>
                            <TableCell>{resultItem.plan}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Tempo de Ligação
                            </TableCell>
                            <TableCell>{resultItem.time}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Custo com Plano
                            </TableCell>
                            <TableCell>R$ {resultItem.costPlan}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Custo sem Plano
                            </TableCell>
                            <TableCell>R$ {resultItem.costNotPlan}</TableCell>
                        </TableRow>
                    </>
                    ):null}
                    </TableBody>
                </Table>
            </TableContainer>
          </Box>

          <Box              
            display="flex" 
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
          <Button
            sx={{
                color:'white', 
                background: '#0aadaf', 
                marginTop:2, 
                marginBottom:1, 
              }} 
              onClick={async()=>{
                  Router.push('/');
              }}
        >
            Voltar
        </Button>
          </Box>

      </PrincipalViewComponent>
    );
}

export default ResultView;