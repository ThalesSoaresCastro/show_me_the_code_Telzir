import React,
{
    useContext,
} from 'react';

import Box from '@mui/material/Box';

// import { Container } from './styles';

import DrawerSideBarComponent from '../components/DrawerSideBarComponent';

import DataContext from '../contexts/listdata';

type ItemElement = {
    id: string;
    origin: string;
    destiny: string;
    price: number;
    create_at: any;
}
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import { Container } from '@mui/material';

import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


const Dashboard: React.FC = () => {

    const { items } = useContext(DataContext);
    const itemsList:Array<ItemElement> = items as Array<ItemElement>;

    return(
        <DrawerSideBarComponent>
        <Container
            sx={{
                width:630,
            }}
        >
        <Box
                display="flex"
                flexDirection="row" 
                alignItems="center"
                justifyContent="center"
            >
                <h2>Valores Cadastrados</h2>
            </Box>
            {itemsList?itemsList.map((item) =>{
                return(
                    <Box 
                        key={item.id}
                        display="flex"
                        flexDirection="row" 
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            borderRadius:3,
                            boxShadow:'2px 2px 2px 2px rgba(0, 0, 0, 0.3)',
                            padding:'2%',
                            marginTop:"3%",
                            backgroud:'white'

                        }}
                    >
                        <PlayCircleFilledIcon 
                            sx={{
                                fontSize:25,
                                color: '#0aadaf'
                            }}
                        />
                        <Typography
                            sx={{margin:"3%", fontSize:"16px"}} 
                        >
                            <strong>Origem:</strong> <br /> {item.origin}
                        </Typography>

                        <CheckCircleIcon 
                            sx={{
                                fontSize:25,
                                color: '#0aadaf'
                            }}
                        />
                        <Typography
                            sx={{margin:"3%", fontSize:"16px"}} 
                        >
                            <strong>Destino:</strong> <br /> {item.destiny}
                        </Typography>

                        <MonetizationOnIcon
                            sx={{
                                fontSize:25,
                                color: '#0aadaf'
                            }}
                        />
                        <Typography
                            sx={{margin:"3%" , fontSize:"16px"}} 
                        >
                            <strong>Preço:</strong> <br/> R$ {item.price}
                        </Typography>
                    </Box>
                )
            })
            :
            <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                    flexGrow: 1, 
                    color:"black", 
                    textAlign: 'center',
                    marginTop:'20%',
                }}
            >
                Nenhum item cadastrado!
            </Typography>}
        </Container>

    </DrawerSideBarComponent>
  );
}

export default Dashboard;