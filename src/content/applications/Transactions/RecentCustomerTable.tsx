import Label  from 'src/components/Label';
import { Box, Card, useTheme } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import {Customer, CustomerStatus} from 'src/models/customer';
import BulkActions from './BulkActions';

interface RecentCustomerTableProps{
    className?: string;
    customer: Customer[];
}

interface Filters{
    estado?: CustomerStatus;
}

const getStatusLabel = (customerStatus: CustomerStatus): JSX.Element => {
    const map = {
        inactivo: {
            text: 'Inactivo',
            color: 'error'
        },
        completado: {
            text: 'Completado',
            color: 'success'
        },
        pendiente: {
            text: 'Pendiente',
            color: 'warning'
        }
    };
    const {text, color}: any = map[customerStatus];
    return <Label color={color}>{text}</Label>;
}

const applyFilters = (
    customer: Customer[],
    filters: Filters
): Customer[] => {
    return customer.filter((customer) => {
        let matches = false;
        if(filters.estado && customer.estado !== filters.estado){
            matches = false;
        }
        return matches;
    });
};

const applyPagination = (
    customer: Customer[],
    page: number,
    limit: number
): Customer[] => {
    return customer.slice(page * limit, page * limit + limit);
};

const RecentCustomerTable: FC<RecentCustomerTableProps> = ({customer}) => {
    const [selectedCustomer, setSelectedCustomer] = useState<string[]>(
        []
    );
    const selectedBulckActions = selectedCustomer.length > 0;
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [filters, setFilters] = useState<Filters>({
        estado: null
    });

    const statusOptions = [
        {
            id: 'todos',
            name: 'Todos'
        },
        {
            id: 'completados',
            name: 'Completados'
        },
        {
            id: 'pendiente',
            name: 'Pendiente'
        },
        {
            id: 'Inactivo',
            name: 'inactivo'
        },
    ];

    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
        let value = null;

        if (e.target.value !== 'todos'){
            value = e.target.value;
        }

        setFilters((prevFilters) =>({
            ...prevFilters,
            estado: value
        }));
    };

    const handleSelectAllCustomer = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        setSelectedCustomer(
            event.target.checked ? customer.map((customer) => customer.idCliente) : []
        );
    };

    const handleSelectOneCustomer = (
        event: ChangeEvent<HTMLInputElement>,
        customerId: string
    ): void => {
        if(!selectedCustomer.includes(customerId)){
            setSelectedCustomer((prevSelected) => [
                ...prevSelected,
                customerId
            ]);
        } else{
            setSelectedCustomer((prevSelected) => prevSelected.filter((idCliente) => idCliente !== customerId));
        }
    };

    const handlePageChange = (event: ChangeEvent<HTMLInputElement>): void =>{
        setLimit(parseInt(event.target.value));
    };

    const filteredCustomer = applyFilters(customer, filters);
    const paginatedCustomer = applyPagination(filteredCustomer, page, limit);
    const selectedSomeCustomer = selectedCustomer.length > 0 && selectedCustomer.length < customer.length;
    const selectedAllCustomer = selectedCustomer.length === customer.length;
    const theme = useTheme();

    return(
        <Card>
            {selectedBulckActions && (
                <Box flex={1} p={2}>
                    <BulkActions/>
                </Box>
            )}
        </Card>
    );
};

export default RecentCustomerTable;