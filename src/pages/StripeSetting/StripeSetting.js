import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { Button, Container, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// components
import StripeSettingAction from './components/StripeSettingAction';
import { request } from 'src/Redux/helpers/axiosRequest';
import withRole from 'src/components/HOC/withRole';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Loader from 'src/components/Loader';

function StripeSetting(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stripeSettings, setStripeSetting] = React.useState([]);
  // For User Role
  const userRole = props.user.userRole;
  const [state, setState] = useState({});

  // Get All Settings
  React.useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/stripe/get-settings`,
      method: "GET",
      data: null
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        setStripeSetting(data.settings);
        setLoading(false);
      });
    const type = userRole == 1 ? null : navigate('/dashboard/app');
    return () => {
      setState({}); // To Avoid Memory Leak
      return type;
    };
  }, []);

  // Stripe Table
  const columns = [
    { field: 'companyName', headerName: 'Company Name', width: 150 },
    {
      field: 'currency',
      headerName: 'Currency',
      width: 100,
      renderCell: (rowData) => <p style={{ textTransform: 'uppercase' }}>{rowData.row.currency}</p>
    },
    {
      field: 'publicKey',
      headerName: 'Public Key',
      width: 220
    },
    {
      field: 'secretkey',
      headerName: 'Secret Key',
      width: 220
    },
    {
      field: 'active',
      headerName: 'Status',
      width: 110,
      renderCell: (rowData) => <>{rowData.row.active === true ? 'Active' : 'In-Active'}</>
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: (rowData) => <StripeSettingAction id={rowData.row._id} />
    }
  ];

  return (
    <Page title="Dashboard: Stripe Setting">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Stripe Settings
          </Typography>

          {/* <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/stripe-setting/add-stripe-setting"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Stripe Setting
          </Button> */}
        </Stack>
        {loading ? (
          <Loader />
        ) : (
          <Stack sx={{ boxShadow: 3, borderRadius: 1, width: '100%' }}>
            <Typography variant="h6" gutterBottom pt={2} pl={2}>
              Data Table of Stripe Setting
            </Typography>
            <DataGrid
              rows={[stripeSettings]}
              columns={columns}
              getRowId={(row) => [row?._id]}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              checkboxSelection
              autoHeight={true}
            />
          </Stack>
        )}
      </Container>
    </Page>
  );
}

export default withRole(StripeSetting);