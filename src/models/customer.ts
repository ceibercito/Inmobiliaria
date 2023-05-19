export type CustomerStatus = 'completado' | 'pendiente' | 'inactivo';

export interface Customer{
    idCliente: string;
    idEmpresa: string;
    idUsuario: string;
    estado: CustomerStatus;
    numeroDocumento: string;
    correo: string;
    celular: string;
    apellidosNombres: string;
    fechaProceso: Date;
}