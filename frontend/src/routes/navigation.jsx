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
import * as menus from './authRoutes.jsx'

const rol = localStorage.getItem('rol')
let menu
switch (rol) {
  case '1':
    menu = menus.admin
    break;
  case '2':
    menu = menus.medico
    break;
  case '3':
    menu = menus.secretario
    break;
  case '4':
    menu = menus.visitante
    break;
  case '5':
    menu = menus.dispensario
    break;

  default:
    menu = menus.visitante
    break;
}

const NAVIGATION = menu

export default NAVIGATION