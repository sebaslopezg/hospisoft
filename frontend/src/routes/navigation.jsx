import DashboardIcon from '@mui/icons-material/Dashboard';
import MedicationIcon from '@mui/icons-material/Medication';
import GroupIcon from '@mui/icons-material/Group';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const NAVIGATION = [
   { // para darle un titulo a la barra
    kind: 'header',
    title: 'Main items',
  }, 
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
/*   {
    segment: 'notes',
    title: 'Noticas',
    icon: <EditNoteIcon />,
    pattern: 'notes{/:noteId}*',
  }, */
  {
    segment: 'usuarios',
    title: 'Usuarios',
    icon: <GroupIcon />,
    pattern: 'usuarios{/:crud}*',
  },
  {
    segment: 'citas',
    title: 'Citas',
    icon: <EventAvailableIcon />,
    pattern: 'citas{/:crud}*',
  },
  {
    segment: 'medicamentos',
    title: 'Medicamentos',
    icon: <MedicationIcon />,
    pattern: 'medicamentos{/:crud}*',
  },
]; 

export default NAVIGATION