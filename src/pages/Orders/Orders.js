import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Typography, Box } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { sentenceCase } from 'change-case';
// import OrderActionButton from './components/OrderActionButton';
import withRole from 'src/components/HOC/withRole';
import Label from 'src/components/Label';
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
      field: 'amountPaid',
      headerName: 'Amout Paid',
      width: 100,
      renderCell: (params) => <>£{params.value}</>
    },
    {
      field: 'paymentStatus',
      headerName: 'Payment Status',
      width: 130,
      renderCell: (rowData) => (
        <Label
          variant="ghost"
          color={(rowData.row.paymentStatus === 'pending' && 'error') || 'success'}
        >
          {sentenceCase(rowData.row.paymentStatus)}
        </Label>
      )
    },
    {
      field: 'promoDiscountPercent',
      headerName: 'Discount Percent',
      width: 130
    },
    {
      field: 'orderDate',
      headerName: 'Order Date',
      width: 130,
      renderCell: (rowData) => new Date(rowData.row.orderDate).toDateString()
    },
    {
      field: 'userEmail',
      headerName: 'User Email',
      width: 150
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
