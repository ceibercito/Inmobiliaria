import { Card } from "@mui/material";
import {Customer} from "src/models/customer";
import RecentCustomerTable from './RecentCustomerTable';

function CustomerList(){
    const customerList: Customer[] = [
        {
            idCliente: '15694C0D-67D0-4E71-86E6-C3770C203939',
            idEmpresa: 'F03EFD10-2ABD-4B88-96B7-3B56783C2980',
            idUsuario: 'F1CFD541-844F-4D83-9216-68FB9DCAE6FB',
            estado: 'completado',
            numeroDocumento: '44971437',
            correo: 'baciliaire1980@gmail.com',
            celular: '995520044',
            ApellidosNombres: 'AIRE MALPARTIDA BACILIA'
            
        }
        
    ];

    return (
        <Card>
            <RecentCustomerTable customer={customerList} />
        </Card>
    )
}

export default CustomerList;