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
import { Link, useNavigate } from 'react-router';

export default function MenuLanding({ handleScrollTo }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const pages = [
    { label: 'Home', target: '#main' },
    { label: 'Acerca de', target: '#about' },
    { label: 'Servicios', target: '#servicios' },
    { label: 'Contáctanos', target: '#contactanos' },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (target) => {
    setAnchorElNav(null);
    if (target) {
      handleScrollTo(target);
    }
  };

  const navigate = useNavigate()

  const handleNavigate = ()=>{
    navigate('/admin')
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Logo and Title */}
          <Box sx={{ display: 'flex', flexGrow: 1, pl: 5, alignItems: 'center' }}>
            <img src={imageLogo} alt="logo" width="40" />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
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
          </Box>

          {/* Mobile menu button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu(null)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ label, target }) => (
                <MenuItem
                  key={label}
                  onClick={() => handleCloseNavMenu(target)}
                >
                  <Typography textAlign="center">{label}</Typography>
                </MenuItem>
              ))}
                <MenuItem
                  key='Administrar'
                  onClick={handleNavigate}
                >
                  <Typography textAlign="center">Administrar</Typography>
                </MenuItem>
            </Menu>
          </Box>

          {/* Desktop menu buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, pr: 15, width: '100%', justifyContent: 'flex-end' }}>
            {pages.map(({ label, target }) => (
              <Button
                key={label}
                onClick={() => handleScrollTo(target)}
                sx={{ my: 2, mx: 3, color: 'white', fontSize: '2vh', fontWeight: 'bold', width: 'auto' }}
              >
                {label}
              </Button>
            ))}
              <Button
                key='Administrar'
                onClick={handleNavigate}
                sx={{ my: 2, mx: 3, color: 'white', fontSize: '2vh', fontWeight: 'bold', width: 'auto' }}
              >
                Administrar
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
