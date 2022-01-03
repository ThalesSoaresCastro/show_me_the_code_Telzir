import React,{
    useState,
    useContext,
} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import Router from 'next/router';

import { 
    CostEstimative,
  } from '../../services/TelzirApiService';
  
type ElementCost = {
  origin: string;
  destiny: string;
  plan: number;
  timeUsed: number;
  setOrigin:any;
  setDestiny: any;
  setPlan: any;
  setTimeUsed: any;
}


type ElementType = {
    origin: string;
    destiny: string;
    plan: number;
    time: number;
  }

type Props={
    info: ElementCost;
}

type ElementValue = {
    origin: string;
    destiny: string;
    plan: number;
    time: number;
    costPlan: number;
    costNotPlan: number;
}

type ItemElement = {
  id: string;
  origin: string;
  destiny: string;
  price: number;
  create_at: any;
}

import DataContext from '../../contexts/listdata';

const OptionsComponent: React.FC<{}> = () => {

  const [destiny,setDestiny] = useState('');
  const [origin,setOrigin] = useState(''); 
  const [plan,setPlan] = useState(30); 
  const [timeUsed, setTimeUsed] = useState(0);
  
  const { items, setResult } = useContext(DataContext);
  const itemsList:Array<ItemElement> = items as Array<ItemElement>;

  const handleChangeDestiny = (event: any) => {
    setDestiny(event.target.value);
  };

  const handleChangePlan = (event: any) => {
    setPlan(event.target.value);
  };
  
  const handleChangeOrigin = (event: any) => {
    setOrigin(event.target.value);
  };

  const handleChangeTimeUsed = (event: any) => {
    setTimeUsed(event.target.value);
  };


  const handleAPIResult = async()=>{
    console.log({
        'origin': origin, 
        'destiny': destiny, 
        'plan': plan, 
        'timeUsed': timeUsed
    });

    if(origin === '' || destiny === '' || !plan || timeUsed === 0 ){
        return alert('Todos os parametros devem ser preenchidos!');
    }

    //criando objeto que será enviado...
    const value:ElementType = {
        origin: origin,
        destiny: destiny,
        plan: plan,
        time: Number(timeUsed)
    }
    let res = await CostEstimative(value)

    if(res.status !== 200){
        return alert("Ocorreu um erro na requisição.");
    }
    await setResult(res.data.element as ElementValue);
    Router.push('/resultView');
  }

  return(
    <Box
        display="flex" 
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginTop={'4%'}
        sx={{
        height:'80%',
        borderRadius:1,
        boxShadow:'2px 2px 2px 2px rgba(0, 0, 0, 0.3)',
        background: '#17c2c4'
        }}
    >

        <Box  
            sx={{ minWidth: '40%'}}
            padding={1}
        >
          <FormControl fullWidth>
            <InputLabel id="origin-label" sx={{color: 'black'}} >Origem</InputLabel>
            <Select
                labelId="origin-label"
                id="origin-select"
                value={origin}
                label="Origem"
                onChange={handleChangeOrigin}
                sx={{background: 'white'}}
            >
              {itemsList?itemsList.map((item)=>(
                <MenuItem key={item.id} value={(item.origin)}>{item.origin}</MenuItem>
              )):null}
            </Select>
          </FormControl>
        </Box>

        <Box  sx={{ minWidth: '40%' }} padding={1}>
            <FormControl fullWidth>
                <InputLabel id="destiny-label" sx={{color: 'black'}} >Destino</InputLabel>
                <Select
                  labelId="destiny-label"
                  id="destiny-select"
                  value={destiny}
                  label="Destino"
                  onChange={handleChangeDestiny}
                  sx={{background: 'white'}}
                >
                  {itemsList?itemsList.map((item)=>(
                    <MenuItem key={item.id} value={(item.destiny)}>{item.destiny}</MenuItem>
                  )):null}
                </Select>
            </FormControl>
        </Box>
        <Box  sx={{ minWidth: '40%' }} padding={1}>
            <FormControl fullWidth>
                <InputLabel id="plan-label" sx={{color: 'black'}}>Plano</InputLabel>
                <Select
                  labelId="plan-label"
                  id="plan-select"
                  value={plan}
                  label="Plano"
                  onChange={handleChangePlan}
                  sx={{background: 'white'}}
                >
                    <MenuItem value={30}>FaleMais 30</MenuItem>
                    <MenuItem value={60}>FaleMais 60</MenuItem>
                    <MenuItem value={120}>FaleMais 120</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Box sx={{ minWidth: '40%' }} padding={1}>
            <InputLabel id="timeUsed-label" sx={{color: 'black'}}>Tempo</InputLabel>
            <TextField 
              id="timeUsed-input" 
              type="Number"
              value={timeUsed}
              onChange={handleChangeTimeUsed}
              sx={{background: 'white', borderRadius:'4px'}}
              variant="filled"
            />
        </Box>

        <Button 
            sx={{
              color:'white', 
              background: '#0aadaf', 
              marginTop:2, 
              marginBottom:1 
            }} 
            onClick={async()=>{
                await handleAPIResult();
            }}
        >
              Consultar
        </Button>
    </Box>

  );
}

export default OptionsComponent;