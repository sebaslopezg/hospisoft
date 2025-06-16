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
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TocIcon from '@mui/icons-material/Toc';
import CampaignIcon from '@mui/icons-material/Campaign';

const admin = [
  {
    segment:'admin',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'admin/usuarios',
    title: 'Usuarios',
    icon: <GroupIcon />,
    pattern: 'usuarios{/:crud}*',
  },
  {
    segment: 'admin/pacientes',
    title: 'Pacientes',
    icon: <Diversity3Icon/>,
    pattern: 'Pacientes{/:crud}*',
  },
  {
    segment: 'admin/citas',
    title: 'Citas',
    icon: <EventAvailableIcon />,
    pattern: 'citas{/:crud}*',
  },
  {
    segment: 'admin/medicamentos',
    title: 'Medicamentos',
    icon: <MedicationIcon />,
    pattern: 'medicamentos{/:crud}*',
  },
  {
    segment: 'admin/ordenes',
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
    segment: 'admin/dispensario',
    title: 'Dispensario',
    icon: <MedicalInformationIcon />,
    children:[
      {
        segment: 'despachar',
        title: 'Despachar',
        icon: <AssignmentTurnedInIcon/>,
        pattern: 'dispensario{/:crud}*'
      },
      {
        segment: 'ver',
        title: 'Ver reportes',
        icon: <TocIcon/>,
        pattern: 'dispensario{/:crud}*'
      }
    ]
  },
  {
    segment: 'admin/historias',
    title: 'Historia clínica',
    icon: <ContentPasteSearchIcon />,
    pattern: 'historias{/:crud}*',
  },
    {
    segment: 'admin/eventos',
    title: 'Campañas',
    icon: <CampaignIcon/>,
    pattern: 'eventos{/:crud}*'
  },
]; 

const medico = [
  {
    segment: 'admin',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'admin/pacientes',
    title: 'Pacientes',
    icon: <Diversity3Icon/>,
    pattern: 'Pacientes{/:crud}*',
  },
  {
    segment: 'admin/ordenes',
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
    segment: 'admin/historias',
    title: 'Historia clínica',
    icon: <ContentPasteSearchIcon />,
    pattern: 'historias{/:crud}*',
  },
    {
    segment: 'admin/eventos',
    title: 'Campañas',
    icon: <CampaignIcon/>,
    pattern: 'eventos{/:crud}*'
  },
]; 

const secretario = [
  {
    segment: 'admin',
    title: 'Dashboard',
    icon: <DashboardIcon />,
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
    segment: 'admin/eventos',
    title: 'Campañas',
    icon: <CampaignIcon/>,
    pattern: 'eventos{/:crud}*'
  },
]; 

const visitante = [

]; 

const dispensario = [
  {
    segment:'admin',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'admin/medicamentos',
    title: 'Medicamentos',
    icon: <MedicationIcon />,
    pattern: 'medicamentos{/:crud}*',
  },
  {
    segment: 'admin/dispensario',
    title: 'Dispensario',
    icon: <MedicalInformationIcon />,
    children:[
      {
        segment: 'despachar',
        title: 'Despachar',
        icon: <AssignmentTurnedInIcon/>,
        pattern: 'dispensario{/:crud}*'
      },
      {
        segment: 'ver',
        title: 'Ver reportes',
        icon: <TocIcon/>,
        pattern: 'dispensario{/:crud}*'
      }
    ]
  },
]

export {
    admin,
    medico,
    secretario,
    visitante,
    dispensario,
}