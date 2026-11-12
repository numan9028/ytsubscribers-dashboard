import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Stack,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

// import OrderActionButton from './components/OrderActionButton';
import withRole from 'src/components/HOC/withRole';
import Page from 'src/components/Page';
import PaginationTable from 'src/components/PaginationTable';

function Orders(props) {
  const navigate = useNavigate();
  const [state, setState] = useState({});
  // Fetch Data from API
  // Searchable Filters
  const [loading, setLoading] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);
  // For User Role
  const userRole = props.user.userRole;

  // Get All Packages
  React.useEffect(() => {
    const type = userRole == 1 ? null : navigate('/dashboard/app');
    return () => {
      setState({}); // To Avoid Memory Leak
      return type;
    };
  }, []);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }


  // Table Columns
  const columns = [
    {
      field: 'orderId',
      headerName: 'Order ID',
      width: 220,
      renderCell: (params) => (
        <Link to={`/dashboard/orders/order-details/${params.value}`} className="order-details-link">
          {params.value}
        </Link>
      )
    },
    {
      field: 'userEmail',
      headerName: 'User Email',
      width: 200
    },
    {
      field: 'orderItems',
      headerName: 'Items',
      width: 460,
      sortable: false,
      cellClassName: 'order-items-cell',
      renderCell: ({ row }) => (
        <Box sx={{ width: '100%', py: 0.5 }}>
          {row.orderItems?.length ? (
            <Table
              size="small"
              aria-label={`Items for order ${row.orderId}`}
              sx={{ width: '100%', tableLayout: 'fixed' }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    '& .MuiTableCell-root': {
                      backgroundColor: 'grey.700',
                      color: 'common.white'
                    }
                  }}
                >
                  <TableCell sx={{ width: '60%', fontWeight: 700 }}>User Name</TableCell>
                  <TableCell sx={{ width: '40%', fontWeight: 700 }}>Service</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.orderItems.map((item) => {
                  const link = item.link || '';
                  const service =
                    item.packageId?.packageTitle ||
                    [item.quantity, item.serviceType].filter(Boolean).join(' ');

                  return (
                    <TableRow key={item._id} sx={{ backgroundColor: 'grey.100' }}>
                      <TableCell
                        title={link}
                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        {/^https?:\/\//i.test(link) ? (
                          <a href={link} target="_blank" rel="noopener noreferrer">
                            {link}
                          </a>
                        ) : (
                          link || '—'
                        )}
                      </TableCell>
                      <TableCell
                        title={service}
                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        {service || '—'}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <Typography variant="body2">No items</Typography>
          )}
        </Box>
      )
    },
    {
      field: 'amountPaid',
      headerName: 'Amout Paid',
      width: 100,
      renderCell: (params) => <>£{params.value}</>
    },
    {
      field: 'promoDiscountPercent',
      headerName: 'Discount Percent',
      width: 130
    },
    {
      field: 'orderDate',
      headerName: 'Order Date (UTC)',
      width: 160,
      renderCell: (rowData) =>
        new Date(rowData.row.orderDate).toLocaleDateString('en-US', {
          timeZone: 'UTC',
          month: 'short',
          day: '2-digit',
          year: 'numeric'
        })
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 200,
      sortable: false,
      filterable: false,
      cellClassName: 'order-actions-cell',
      renderCell: ({ row }) =>
        row.paymentStatus === 'initiated' ? null : (
          <Stack direction="row" spacing={0.5}>
            <Button
              component="a"
              href={`https://www.ytsubscribers.com/track-order/${row.orderId}/`}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              variant="contained"
              color="success"
            >
              Track
            </Button>
            <Button
              type="button"
              size="small"
              variant="contained"
              color="warning"
              startIcon={<KeyboardReturnIcon />}
            >
              Refund
            </Button>
          </Stack>
        )
    }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  return (
    <Page title={props.title ? 'Dashboard' : 'Dashboard: Orders'}>
      <Box p={props.title ? 0 : 2}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            All Orders
          </Typography>    
         
        </Stack>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            // scrollButtons
            aria-label="visible arrows tabs example"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: '0.3' }
              }
            }}
          >
            <Tab label="Completed" {...a11yProps(0)} />
            <Tab label="Initiated" {...a11yProps(1)} />
            <Tab label="Test" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <OrderTabPanel
            match="succeeded"
            columns={columns}
            loading={loading}
          />
        </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <OrderTabPanel
              match="initiated"
              columns={columns}
              loading={loading}
            />
          </TabPanel>
       
          <TabPanel value={tabValue} index={2}>
            <OrderTabPanel
              match="testing"
              columns={columns}
              loading={loading}
            />
          </TabPanel>
      </Box>
    </Page>
  );
}

export default withRole(Orders);
const OrderTabPanel = ({ match, columns, loading }) => {
  return (
    <PaginationTable
      searchPlaceholder="Search..."
      tableHeading={`for Orders ${match}`}
      match={match}
      columns={columns}
      loading={loading}
     
    />
  );
};
