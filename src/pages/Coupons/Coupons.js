import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Typography, Button, Box } from '@mui/material';
import { request } from 'src/Redux/helpers/axiosRequest';
//
import Loader from '../../components/Loader';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import CouponActionButton from './components/CouponActionButton';

export default function Coupons(props) {
  const [coupons, setCoupons] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // Get All Coupons
  React.useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/coupons/get-all`,
      method: "GET",
      data: null
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        setCoupons(data.coupons);
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: 'promoName', headerName: 'Promo Name', width: 120 },
    { field: 'promoCode', headerName: 'Promo Code', width: 120 },
    { field: 'promoLimit', headerName: 'Promo Limit', width: 100 },
    {
      field: 'promoUsed',
      headerName: 'Promo Used',
      width: 100
    },
    {
      field: 'discountPercent',
      headerName: 'Discount Percent',
      width: 130,
      renderCell: (rowData) => <>{rowData.row.discountPercent} %</>
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 130,
      renderCell: (rowData) => moment(rowData.row.startDate).format('MMMM Do, YYYY')
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 130,
      renderCell: (rowData) => moment(rowData.row.endDate).format('MMMM Do, YYYY')
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 110,
      renderCell: (value) => <CouponActionButton value={value.row.action} id={value.row._id} />
    }
  ];

  return (
    <Page title={props.title ? 'Dashboard' : 'Dashboard: Coupons'}>
      <Box p={props.title ? 0 : 2}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          {!props.userRole ? (
            <>
              <Typography variant="h4" gutterBottom>
                All Coupons
              </Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to="/dashboard/coupons/add-coupon"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Add Coupons
              </Button>
            </>
          ) : (
            ''
          )}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h5" gutterBottom>
            Coupons Table
          </Typography>
        </Stack>
        {!loading ? (
          <Stack sx={{ boxShadow: 3, borderRadius: 1, width: '100%' }}>
            <DataGrid
              rows={coupons}
              getRowId={(row) => row._id}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              checkboxSelection
              autoHeight={true}
            />
          </Stack>
        ) : (
          <Loader />
        )}
      </Box>
    </Page>
  );
}
