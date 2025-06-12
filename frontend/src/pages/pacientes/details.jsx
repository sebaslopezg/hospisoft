import { ListItemIcon, Box, Grid, Typography, List, ListItem, ListItemText, Stack } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EventIcon from '@mui/icons-material/Event';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import EmailIcon from '@mui/icons-material/Email';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import data from './data';
import { useEffect, useState } from 'react';

export const CustomListItem = ({icon, title, info})=>{
    return <ListItem alignItems="flex-start">
                  <ListItemIcon sx={{mr:-3}}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}>
                        <Typography sx={{fontWeight:'bold', mr: 1}}>{title}</Typography>
                        <Typography sx={{flex: 1, wordBreak: 'break-word', whiteSpace: 'normal'}}>{info}</Typography>
                    </Box>
                    }
                    sx={{ width: '100%' }}
                  />
                </ListItem>
}

export const PacientesDetails = ({idPaciente}) => {
    const [info, setInfo] = useState([])
    
    const getDataPacientes = ()=>{
        const response = data.getOne(idPaciente)
        response.then((data)=>{
            setInfo(data.data.data)
            console.log(data.data.data);
            
        })
    }

    useEffect(()=>{
        getDataPacientes()
    },[])

    return <>
    <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid sx={{mb:3}} container justifyContent='center'>
            <Typography variant="h5" component="div" sx={{fontWeight:'bold', mt:3}}>
            Detalles del paciente
        </Typography>
        </Grid>
      <Grid container spacing={2} justifyContent="space-around">
        <Grid item xs={12} md={5}>
            <List>
                <CustomListItem
                    icon={<DriveFileRenameOutlineIcon color='primary'/>}
                    title='Nombre:'
                    info={info.nombre}
                />
                <CustomListItem
                    icon={<AssignmentIndIcon color='primary'/>}
                    title='Identificación:'
                    info={info.documento}
                />
                <CustomListItem
                    icon={<EventIcon color='primary'/>}
                    title='Edad:'
                    info={info.edad}
                />
                <CustomListItem
                    icon={<LocalPhoneIcon color='primary'/>}
                    title='Telefono:'
                    info={info.telefono}
                />
                <CustomListItem
                    icon={<LocationPinIcon color='primary'/>}
                    title='Dirección:'
                    info={info.direccion}
                />
            </List>
        </Grid>
           <Grid item xs={12} md={5}>
            <List>
                <CustomListItem
                    icon={<EmailIcon color='primary'/>}
                    title='Correo:'
                    info={info.email}
                />
                <CustomListItem
                    icon={<HealthAndSafetyIcon color='primary'/>}
                    title='EPS:'
                    info={info.eps}
                />
                <CustomListItem
                    icon={<CoronavirusIcon color='primary'/>}
                    title='Alergias:'
                    info={info.alergias}
                />
                <CustomListItem
                    icon={<WaterDropIcon color='primary'/>}
                    title='Grupo Sanguíneo:'
                    info={info.grupoSanguineo}
                />
                <CustomListItem
                    icon={<BloodtypeIcon color='primary'/>}
                    title='RH:'
                    info={info.rh}
                />
            </List>
        </Grid>
      </Grid>
    </Box>
    </>;
}