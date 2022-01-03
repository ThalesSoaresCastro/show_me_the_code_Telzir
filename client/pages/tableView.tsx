import React,{
    useContext,
}from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Router from 'next/router';
import PrincipalViewComponent from '../components/PrincipalViewComponent';
import DataContext from '../contexts/listdata';

type ItemElement = {
    id: string;
    origin: string;
    destiny: string;
    price: number;
    create_at: any;
}

const TableView: React.FC = () => {

  const { items } = useContext(DataContext);
  const itemsList:Array<ItemElement> = items as Array<ItemElement>;

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
              Tabela de preços das ligações por origem e destino
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
                    <TableHead>
                    <TableRow>
                        <TableCell>Origem</TableCell>
                        <TableCell >Destino</TableCell>
                        <TableCell >Preço</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {itemsList?itemsList.map((item) => (
                        <TableRow
                        key={item.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {item.origin}
                        </TableCell>
                        <TableCell>{item.destiny}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        </TableRow>
                    )):null}
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

export default TableView;