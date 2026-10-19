import { useState, useEffect } from 'react';
import { request } from 'src/Redux/helpers/axiosRequest';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Box, CircularProgress } from '@mui/material';
//
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
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
  color: theme.palette.info.darker,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.darker, 0)} 0%, ${alpha(
    theme.palette.info.darker,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export function AppFaqs() {
  const [loading, setLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);

  // Get All Faqs
  useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/faq/get-all`,
      method: "GET",
      data: null,
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        setFaqs(data.faqs);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <RootStyle>
        <IconWrapperStyle>
          <Iconify icon="mdi:frequently-asked-questions" width={24} height={24} />
        </IconWrapperStyle>
        <Typography variant="h3">
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={30} />
            </Box>
          ) : (
            faqs?.length
          )}
        </Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          App Faqs
        </Typography>
      </RootStyle>
    </>
  );
}
