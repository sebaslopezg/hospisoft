import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import '../../assets/css/calendarStyle.css'
import { Box, Button, Card } from '@mui/material'
import { useState, useEffect } from 'react'
import data from './data'
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material'
import { useDialogs } from '@toolpad/core/useDialogs'
import Select from '@mui/material/Select';
import {MenuItem} from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import {FormControl} from '@mui/material'

import { useNotifications } from '@toolpad/core/useNotifications';
import { useNavigate } from "react-router";

import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export function Calendario() {
    const [open, setOpen] = useState(false)
    const [calendarData, setCalendarData] = useState([])
    const [pacienteId, setPacienteId] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [medicoId, setMedicoId] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [citaId, setCitaId] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [medicos, setMedicos] = useState([])
    const dialogs = useDialogs()
    const [documentoPacienteValue, setdocumentoPaciente] = useState([]);
    const [PacienteDataValue, setPacienteData] = useState([]);
    const notifications = useNotifications();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setMedicoId(e.target.value);
  }
  
    const getAllMedicos = () =>{
      const response = data.getMedicos()
      response.then((res) => {
         res.data.rol
        setMedicos(res.data.data)
      })
    }

      const handleDocumentoPacienteValue = (value) =>{
        setdocumentoPaciente(value)
      }
    
      const handleSearchPerson = () => {
        const response = data.getPacienteByDocument(documentoPacienteValue)
        response.then((res) => {
          console.log(res.data)
          res.data.status ? (
            setPacienteData(res.data.data),
            notifications.show(res.data.msg, 
            {severity: 'success',autoHideDuration: 3000,})
          ) : (
            notifications.show(res.data.msg, 
            {severity: 'error',autoHideDuration: 3000,})
          )
        })
        .catch((err) =>{
        notifications.show('Error de conexión: ' + err.message, 
          {severity: 'error',autoHideDuration: 3000,})
        })
      }

  useEffect(()=>{
    getData()
    getAllMedicos()
  },[])

  const handleAddEvent = async()=>{
    const payload={
      fecha:selectedDate,
      descripcion,
      pacienteId: PacienteDataValue._id,
      medicoId
    }
    try{
      const response = await data.createOne(payload)
      await getData()
      const newCita = response.data
      setCalendarData(prevData => [...prevData, newCita]); 
      handleClose();
      setDescripcion('');
      setMedicoId('')
      setPacienteId('');
    } catch (error) {
      console.error("Error al crear la cita:", error);
    }
  }

  const handleUpdateEvent = async(changeInfo)=>{
    const payload = {
      fecha: selectedDate,
      descripcion,
      pacienteId,
      medicoId
    };

  try {
    const response = await data.updateOne(citaId, payload);
    await getData()
    const updatedCita = response.data;

    setCalendarData(prev =>
      prev.map(event => event._id === citaId ? updatedCita : event)
    );

    handleClose();
  } catch (error) {
    console.error("Error al editar la cita:", error);
  }
  }

  const handleEventChange = async (changeInfo)=>{
    const updatedEvent = changeInfo.event;
    const id = updatedEvent.id
    console.log(updatedEvent.startStr);
    
    const payload={
      fecha: updatedEvent.startStr,
      descripcion: updatedEvent.title,
      pacienteId: updatedEvent.extendedProps.pacienteId,
      medicoId: updatedEvent.extendedProps.medicoId

    }
    try{
      const response = await data.updateOne(id, payload)
      await getData()
      const updatedCita = response.data
      setCalendarData(prev => prev.map(event => event.id === id ? updatedCita : event)); 
    } catch (error) {
      console.error("Error al editar la cita:", error);
      changeInfo.revert();
    }
  }

  const handleDelete = async()=>{
    const id = selectedEvent.id;
    const confirmed = await dialogs.confirm('¿Seguro que desea eliminar el registro?', {
          okText: 'Si',
          cancelText: 'No',
          title: 'Eliminar'
        });
        if (confirmed) {
          try{
            await data.deleteOne(id)
            setCalendarData(prev => prev.filter(event => event.id !== id))
            getData()
            handleClose()
          } catch (error){
            console.log(`Error al eliminar la cita: ${error}`);
            
          }
        }
  }
    
  const getData = () =>{
    const response = data.getAll()
      response.then((data) => {
        setCalendarData(data.data.data)
      })
  }
    
    const calendarEvents = calendarData.map(cita=>({
            id: cita._id,
            title: cita.descripcion, 
            start: cita.fecha,
            extendedProps: {
              pacienteId: cita.pacienteId,
              medicoId: cita.medicoId
            }
        })
    )

    const renderEventContent = (eventInfo) => {
        return (<>
        <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>);
    }

    const handleEventClick = (clickInfo)=>{
      const event = clickInfo.event

      setDescripcion(event.title)
      setPacienteId(event.extendedProps.pacienteId);
      setMedicoId(event.extendedProps.medicoId)
      setSelectedDate(event.startStr);
      setSelectedEvent(event)
      setCitaId(event.id)
      setIsEditing(true)
      handleClickOpen();
    }

    const handleDateSelect = (selectInfo)=>{
      setDescripcion('');
      setPacienteId('');
      setMedicoId('')
      setCitaId('');
      setSelectedDate(selectInfo.startStr);
      setIsEditing(false)
      handleClickOpen();
    }

  return (
  <Card sx={{backgroundColor:'background.default'}}>
    <div>
      <FullCalendar
        aspectRatio={1.8}
        editable={true}
        selectable={true}
        locale={esLocale}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView='timeGridWeek'
        weekends={true}
        events={calendarEvents}
        eventContent={renderEventContent}
        headerToolbar={{
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        eventChange={handleEventChange}
        eventClick={handleEventClick}
        select={handleDateSelect}
      />

      <Dialog  
        fullWidth
        maxWidth='sm'
        open={open}
        onClose={handleClose}>
          <DialogTitle>{isEditing ? 'Editar cita' : 'Nueva cita'}</DialogTitle>
          <DialogContent>
            <form>
              <FormControl sx={{width:'100%', mt:3}}>
              <InputLabel id="medicoId">Medico</InputLabel>
              <Select
              labelId="medicoId"
              value={medicoId}
              label="medico"
              name='medicoId'
              onChange={handleChange}
              
            >
              {
                medicos ? (
                medicos.map((medico) => {
                return(
                  <MenuItem value={medico._id}>{medico.nombre}</MenuItem>
                )
                })
                ) : ''
              }
          </Select>
        </FormControl>
              <Box sx={{display: 'flex', flexDirection:'column'}}>
                <TextField 
                  multiline 
                  maxRows={4} 
                  required 
                  name="descripcion" 
                  label="Descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
                <Stack spacing={2} direction='row'>
          <TextField
            required 
            name="pacienteId" 
            label="Documento de identidad del paciente" 
            onChange={(e) => handleDocumentoPacienteValue(e.target.value)}
          />
          <Tooltip title="Buscar Usuario">
            <IconButton onClick={(e) => handleSearchPerson()} aria-label="delete" size="large">
              <SearchIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
              </Box>
            </form>
          </DialogContent>
          <DialogActions>
            {isEditing ? <Button onClick={handleDelete} variant='contained' color='error'>Eliminar</Button> : ''}
            <Button onClick={handleClose} variant='contained' color='grey'>Cerrar</Button>
            <Button onClick={isEditing ? handleUpdateEvent : handleAddEvent} variant='contained'>{isEditing ? 'Guardar' : 'Agregar'}</Button>
          </DialogActions>
      </Dialog>
    </div>
  </Card>)
}