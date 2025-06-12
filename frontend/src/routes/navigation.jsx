import DashboardIcon from '@mui/icons-material/Dashboard';
import MedicationIcon from '@mui/icons-material/Medication';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import GroupIcon from '@mui/icons-material/Group';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DescriptionIcon from '@mui/icons-material/Description';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ScienceIcon from '@mui/icons-material/Science';
import ChecklistIcon from '@mui/icons-material/Checklist';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

const NAVIGATION = [
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
    icon: <Diversity3Icon/>,
    pattern: 'Pacientes{/:crud}*',
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
  {
    segment: 'ordenes',
    title: 'Órdenes',
    icon: <ChecklistIcon/>,
    children:[
      {
        segment: 'formulas',
        title: 'Formulas',
        icon: <DescriptionIcon />,
        pattern: 'formulas{/:crud}*',
      },
      {
        segment: 'diagnosticos',
        title: 'Diagnosticos',
        icon: <TroubleshootIcon />,
        pattern: 'diagnosticos{/:crud}*',
      },
      {
        segment: 'examenes',
        title: 'Exámenes',
        icon: <ScienceIcon />,
        pattern: 'examenes{/:crud}*',
      },
    ]
  },
  {
    segment: 'dispensario',
    title: 'Dispensario',
    icon: <MedicalInformationIcon />,
    pattern: 'dispensario{/:crud}*',
  },
  {
    segment: 'historias',
    title: 'Historia clínica',
    icon: <ContentPasteSearchIcon />,
    pattern: 'historias{/:crud}*',
  },
]; 

export default NAVIGATION