import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'
import interactionPlugin from '@fullcalendar/interaction'
import '../../assets/css/calendarStyle.css'
import { Card } from '@mui/material'
import { useState, useEffect } from 'react'
import data from './data'

const events = [
  { title: 'Meeting', start: new Date() }
]

export function Calendario() {
    const [calendarData, setCalendarData] = useState([])

    useEffect(()=>{
            getData()
        },[])
    
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

  return (<Card sx={{backgroundColor:'background.default'}}>
    <div>
      <FullCalendar
      editable={true}
      locale={esLocale}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={calendarEvents}
        eventContent={renderEventContent}
      />
    </div>
  </Card>)
}