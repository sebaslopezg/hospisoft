import { DataTable } from './TableUsers' 
import ModalAdd from '../../components/ModalAdd';

export const Users = () => {
    return <>
    <h1>Usuarios</h1>
    <ModalAdd/>
    <DataTable/>
    </>;
}