import Label from 'src/components/Label';
import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { Customer, CustomerStatus } from 'src/models/customer';
import BulkActions from './BulkActions';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

interface RecentCustomerTableProps {
  className?: string;
  customer: Customer[];
}

interface Filters {
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
  const { text, color }: any = map[customerStatus];
  return <Label color={color}>{text}</Label>;
};

const applyFilters = (customer: Customer[], filters: Filters): Customer[] => {
  return customer.filter((customer) => {
    let matches = true;
    if (filters.estado && customer.estado !== filters.estado) {
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

const RecentCustomerTable: FC<RecentCustomerTableProps> = ({ customer }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<string[]>([]);
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
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'todos') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
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
    if (!selectedCustomer.includes(customerId)) {
      setSelectedCustomer((prevSelected) => [...prevSelected, customerId]);
    } else {
      setSelectedCustomer((prevSelected) =>
        prevSelected.filter((idCliente) => idCliente !== customerId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCustomer = applyFilters(customer, filters);
  const paginatedCustomer = applyPagination(filteredCustomer, page, limit);
  const selectedSomeCustomer = selectedCustomer.length > 0 && selectedCustomer.length < customer.length;
  const selectedAllCustomer = selectedCustomer.length === customer.length;
  const theme = useTheme();
  
  return (
    <Card>
      {selectedBulckActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulckActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Estado</InputLabel>
                <Select
                  value={filters.estado || 'todos'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Clientes Recientes"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCustomer}
                  indeterminate={selectedSomeCustomer}
                  onChange={handleSelectAllCustomer}
                />
              </TableCell>
              <TableCell>APELLIDOS Y NOMBRES</TableCell>
              <TableCell>DOCUMENTO IDENTIDAD</TableCell>
              <TableCell>NUMERO MOVIL</TableCell>
              <TableCell>CORREO</TableCell>
              <TableCell align="right">ESTADO</TableCell>
              <TableCell align="right">ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCustomer.map((customer) => {
              const isCustomerSelected = selectedCustomer.includes(
                customer.idCliente
              );
              return (
                <TableRow
                  hover
                  key={customer.idCliente}
                  selected={isCustomerSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCustomerSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCustomer(event, customer.idCliente)
                      }
                      value={isCustomerSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {customer.apellidosNombres}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(customer.fechaProceso, 'dd MMMM yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {customer.numeroDocumento}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {customer.celular}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {customer.correo}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{getStatusLabel(customer.estado)}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar Cliente" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar Cliente" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.error.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>          
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCustomer.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentCustomerTable.propTypes = {
  customer: PropTypes.array.isRequired
};

RecentCustomerTable.defaultProps = {
  customer: []
};

export default RecentCustomerTable;
