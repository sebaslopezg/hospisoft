import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import imageLogo from '../../../assets/img/logo.png'
import { Stack } from '@mui/material';

const pages = ['Acerca de', 'Nuestro equipo', 'Servicios', 'Contáctanos'];

export default function MenuLanding({handleScrollTo}) {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', flexGrow: 1, pl:5, width:'40'}}>
            <Stack
              direction="row"
              spacing={2}
              sx={{
              justifyContent: 'flex-start',
              alignItems: "center",
              }}
            >
            <img src={imageLogo} alt="" width='8%'/>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
            sx={{
              ml: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              }}
            >
              HospiSoft
            </Typography>
            </Stack>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', pr:15, width:'100%' }}>
              <Button onClick={()=>handleScrollTo('#main')}
                sx={{ my: 2, mx:3 ,color: 'white', display: 'block', fontSize:'2vh', fontWeight:'bold', width:'40%'}}
              >
                Home
              </Button>
              <Button onClick={()=>handleScrollTo('#about')}
                sx={{ my: 2, mx:3 ,color: 'white', display: 'block', fontSize:'2vh', fontWeight:'bold', width:'40%'}}
              >
                Acerca de
              </Button>
              <Button onClick={()=>handleScrollTo('#team')}
                sx={{ my: 2, mx:3 ,color: 'white', display: 'block', fontSize:'2vh', fontWeight:'bold', width:'40%'}}
              >
                Nuestro equipo
              </Button>
              <Button onClick={()=>handleScrollTo('#servicios')}
                sx={{ my: 2, mx:3 ,color: 'white', display: 'block', fontSize:'2vh', fontWeight:'bold', width:'40%'}}
              >
                Servicios
              </Button>
              <Button onClick={()=>handleScrollTo('#contactanos')}
                sx={{ my: 2, mx:3 ,color: 'white', display: 'block', fontSize:'2vh', fontWeight:'bold', width:'40%'}}
              >
                Contáctanos
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
