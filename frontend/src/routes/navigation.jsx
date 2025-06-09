import DashboardIcon from '@mui/icons-material/Dashboard';
import MedicationIcon from '@mui/icons-material/Medication';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import GroupIcon from '@mui/icons-material/Group';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DescriptionIcon from '@mui/icons-material/Description';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

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
    segment: 'pacientes',
    title: 'Pacientes',
    icon: <SportsKabaddiIcon />,
    pattern: 'Pacientes{/:crud}*',
  },
  {
    segment: 'citas',
    title: 'Citas',
    icon: <EventAvailableIcon />,
    pattern: 'citas{/:crud}*',
  },
  {
    segment: 'formulas',
    title: 'Formulas',
    icon: <DescriptionIcon />,
    pattern: 'formulas{/:crud}*',
  },
  {
    segment: 'medicamentos',
    title: 'Medicamentos',
    icon: <MedicationIcon />,
    pattern: 'medicamentos{/:crud}*',
  },
  {
    segment: 'diagnosticos',
    title: 'Diagnosticos',
    icon: <TroubleshootIcon />,
    pattern: 'diagnosticos{/:crud}*',
  },
  {
    segment: 'historias',
    title: 'Historia clínica',
    icon: <ContentPasteSearchIcon />,
    pattern: 'historias{/:crud}*',
  },
]; 

export default NAVIGATION