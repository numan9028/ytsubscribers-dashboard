import React from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Box, CircularProgress } from '@mui/material';
// component
import Iconify from 'src/components/Iconify';
import { request } from 'src/Redux/helpers/axiosRequest';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

// const TOTAL = 714000;

export default function TotalOrders() {
  const [loading, setLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);

  // Get All Orders
  React.useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/orders/get-all`,
      method: "GET",
      data: null,
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        setOrders(data.orders);
        setLoading(false);
      });
  }, []);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="mdi:cart" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={30} />
          </Box>
        ) : (
          orders?.length
        )}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Orders
      </Typography>
    </RootStyle>
  );
}
