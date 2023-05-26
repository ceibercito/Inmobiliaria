import { Card } from "@mui/material";
import {Customer} from "src/models/customer";
import RecentCustomerTable from './RecentCustomerTable';
import { subDays } from "date-fns";
import React from "react";
import { customer } from "src/api/customer";


function CustomerList(){
    React.useEffect(()=>{
        customer.getAll().then((r)=>{
            console.log(r.data.results);
        }).catch((e)=>{
            console.error(e);
        })
    }, [])    
    const customers: Customer[] = [
        {
            idCliente: '15694C0D-67D0-4E71-86E6-C3770C203939',
            idEmpresa: 'F03EFD10-2ABD-4B88-96B7-3B56783C2980',
            idUsuario: 'F1CFD541-844F-4D83-9216-68FB9DCAE6FB',
            estado: 'completado',
            numeroDocumento: '44971437',
            correo: 'baciliaire1980@gmail.com',
            celular: '995520044',
            apellidosNombres: 'AIRE MALPARTIDA BACILIA',
            fechaProceso: new Date()
            
        },
        {
            idCliente: '15694C0D-67D0-4E71-86E6-C3770C203939',
            idEmpresa: 'F03EFD10-2ABD-4B88-96B7-3B56783C2980',
            idUsuario: 'F1CFD541-844F-4D83-9216-68FB9DCAE6FB',
            estado: 'completado',
            numeroDocumento: '40800784',
            correo: 'erika_alayo@hotmail.com',
            celular: '955565093',
            apellidosNombres: 'ALAYO RODRIGUEZ ERIKA JOHANNY',
            fechaProceso: new Date()
            
        },
        {
            idCliente: '15694C0D-67D0-4E71-86E6-C3770C203939',
            idEmpresa: 'F03EFD10-2ABD-4B88-96B7-3B56783C2980',
            idUsuario: 'F1CFD541-844F-4D83-9216-68FB9DCAE6FB',
            estado: 'pendiente',
            numeroDocumento: '70258515',
            correo: 'topfast15@gmail.com',
            celular: '947021428',
            apellidosNombres: 'ALFARO ROSALES LUIS ENRIQUE',
            fechaProceso: new Date()
            
        },
        {
            idCliente: '15694C0D-67D0-4E71-86E6-C3770C203939',
            idEmpresa: 'F03EFD10-2ABD-4B88-96B7-3B56783C2980',
            idUsuario: 'F1CFD541-844F-4D83-9216-68FB9DCAE6FB',
            estado: 'pendiente',
            numeroDocumento: '07883853',
            correo: 'harryalvarado@gmail.com',
            celular: '993688901',
            apellidosNombres: 'ALVARADO COBO HARRY JAVIER',
            fechaProceso: new Date()
            
        },
        {
            idCliente: '15694C0D-67D0-4E71-86E6-C3770C203939',
            idEmpresa: 'F03EFD10-2ABD-4B88-96B7-3B56783C2980',
            idUsuario: 'F1CFD541-844F-4D83-9216-68FB9DCAE6FB',
            estado: 'inactivo',
            numeroDocumento: '44971437',
            correo: 'baciliaire1980@gmail.com',
            celular: '995520044',
            apellidosNombres: 'AIRE MALPARTIDA BACILIA',
            fechaProceso: new Date()
            
        },
        {
            idCliente: '15694C0D-67D0-4E71-86E6-C3770C203939',
            idEmpresa: 'F03EFD10-2ABD-4B88-96B7-3B56783C2980',
            idUsuario: 'F1CFD541-844F-4D83-9216-68FB9DCAE6FB',
            estado: 'completado',
            numeroDocumento: '41111567',
            correo: 'allen_cesar@hotmail.com',
            celular: '947920750',
            apellidosNombres: 'ALVINO VILLAREAL ALLEN CESAR',
            fechaProceso: new Date()
            
        },
        {
            idCliente: '15694C0D-67D0-4E71-86E6-C3770C203939',
            idEmpresa: 'F03EFD10-2ABD-4B88-96B7-3B56783C2980',
            idUsuario: 'F1CFD541-844F-4D83-9216-68FB9DCAE6FB',
            estado: 'completado',
            numeroDocumento: '44971437',
            correo: 'baciliaire1980@gmail.com',
            celular: '995520044',
            apellidosNombres: 'AIRE MALPARTIDA BACILIA',
            fechaProceso: new Date()
            
        }

        
    ];

    return (
        <Card>
            <RecentCustomerTable customer={customers} />
        </Card>
    );
}

export default CustomerList;