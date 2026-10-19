import { useState, useEffect } from 'react';
// material
import { request } from 'src/Redux/helpers/axiosRequest';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Box, CircularProgress } from '@mui/material';
//
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
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
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppItemOrders() {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  // Get All Faqs
  useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/reviews/get-all`,
      method: "GET",
      data: null,
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        setReviews(data.reviews);
        setLoading(false);
      });
  }, []);
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="mdi:printer-eye" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={30} />
          </Box>
        ) : (
          reviews?.length
        )}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Reviews
      </Typography>
    </RootStyle>
  );
}
