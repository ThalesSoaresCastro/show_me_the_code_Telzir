import React,{
    useContext,
} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import Button from '@mui/material/Button';
import Router from 'next/router';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

import AuthContext from '../../contexts/auth';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

type Props = {
    children?:React.ReactNode;
}

const DrawerSideBarComponent: React.FC<Props>=({children}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { user } = useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} 
        sx={{background: '#0aadaf'}} 
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Telzir ADMIN
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: '#f8f8ff',
            boxShadow:'1px 3px 3px 3px rgba(0, 0, 0, 0.2)',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Box
            display="flex" 
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
        <AccountCircleIcon 
            sx={{
                fontSize:90,
                color: '#0aadaf'
            }}
        />
        </Box>
        <Typography 
              variant="h6" 
              component="div" 
              sx={{  
                color:"black",
                textAlign:"center"
                }}
            >
              {user?.nome}
            </Typography>

        <Typography 
              variant="h6" 
              component="div" 
              sx={{  
                color:"black",
                textAlign:"center"
                }}
            >
              {user?.email}
            </Typography>
        
        <Divider />

        <Typography 
              variant="h6" 
              component="div" 
              sx={{  
                color:"black",
                marginLeft:2
                }}
        >
            Ligações
        </Typography>
            
        <List>
          {['Elementos', 'Alteração', 'Inserção', 'Exclusão'].map((text, index) => (
            <ListItem button key={text}
                onClick={()=>{
                    if(text === 'Elementos'){
                       return Router.push('/dashboard');
                    }
                    if(text === 'Alteração'){
                        return Router.push('/alterlist');
                    }
                    if(text === 'Inserção'){
                        return Router.push('/insertlist');
                     }
                     if(text === 'Exclusão'){
                         return Router.push('/deletelist');
                     }
                }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />

        <Typography 
              variant="h6" 
              component="div" 
              sx={{  
                color:"black",
                marginLeft:2
                }}
        >
            Usuários
        </Typography>

        <List>
          {['Todos', 'Alteração', 'Exclusão'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Button
            sx={{
                color:'#0aadaf', 
                marginTop:'40%', 
                fontSize:'16px',
            }}
            onClick={async()=>{
                Router.push('/');
            }}
        >
            Sair
        </Button>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
         {children}
      </Main>
    </Box>
  );
}

export default DrawerSideBarComponent;