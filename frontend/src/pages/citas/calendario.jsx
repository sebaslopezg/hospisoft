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

export function Calendario() {
    const [open, setOpen] = useState(false)
    const [calendarData, setCalendarData] = useState([])
    const [pacienteId, setPacienteId] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [selectedDate, setSelectedDate] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    getData()
  },[])

  const handleAddEvent = ()=>{
    const payload={
      fecha:selectedDate,
      descripcion,
      pacienteId
    }
    try{
      const response = data.createOne(payload)
      setCalendarData(prev => [...prev, response.data]); 
      handleClose();
      setDescripcion('');
      setPacienteId('');
    } catch (error) {
      console.error("Error creating event:", error);
    }
  }

  const handleEditEvent = ()=>{
    const payload={
      fecha:selectedDate
    }
  }
    
  const getData = () =>{
    const response = data.getAll()
      response.then((data) => {
        setCalendarData(data.data.data)
      })
  }
    
    const calendarEvents = calendarData.map(cita=>({
            title: cita.descripcion, 
            date: cita.fecha,
        })
    )

    const renderEventContent = (eventInfo) => {
        return (<>
        <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>);
    }

    const handleEventChange = ()=>{
        
    }

    const handleEventClick = ()=>{

    }

    const handleDateSelect = (selectInfo)=>{
      setSelectedDate(selectInfo.startStr);
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
          <DialogTitle>Nueva cita</DialogTitle>
          <DialogContent>
            <form>
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
                <TextField 
                  multiline 
                  maxRows={4} 
                  required 
                  name="pacienteId" 
                  label="Paciente"
                  value={pacienteId}
                  onChange={(e) => setPacienteId(e.target.value)}
                />
              </Box>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant='contained' color='grey'>Cerrar</Button>
            <Button onClick={handleAddEvent} variant='contained'>Agregar</Button>
          </DialogActions>
      </Dialog>
    </div>
  </Card>)
}