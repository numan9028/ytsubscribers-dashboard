import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// material
import { Grid, Container, Stack, Typography, Button, Box, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// components
import Page from 'src/components/Page';
import Loader from 'src/components/Loader';
//
import { singleUser } from 'src/Redux/actions/authActions';

const UserProfile = () => {
  // Single User
  const userId = localStorage.getItem('userId');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const pageState = useSelector((state) => state.auth.items);
  const [pageSections, setPageSection] = useState({
    data: []
  });
  const formData = pageState;
  const userRole = pageState.user?.userRole;

  // Get Single User Data
  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState.user]);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        dispatch(singleUser(userId));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  return (
    <Page title="Dashboard: Pages | User Profile">
      <Container>
        <Stack direction="row" justifyContent="space-around" mb={2}>
          <Typography variant="h4" gutterBottom>
            User Details
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/dashboard/app"
            startIcon={<ArrowBackIcon />}
          >
            Go Back to Dashboard
          </Button>
        </Stack>
        {loading && <Loader />}
        {!loading && pageState?.user && (
          <Grid container display="flex" alignItems="center" justifyContent="center" spacing={1}>
            <Grid lg={6} md={6} xs={10} sm={10} mt={2}>
              <Box sx={{ boxShadow: 3, borderRadius: '16px' }}>
                <Card sx={{ maxWidth: '100%', textAlign: 'center' }}>
                  <CardContent>
                    <Grid display="flex" justifyContent="end">
                      <Button
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/dashboard/user-profile/edit"
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </Grid>
                    <Stack direction="row" justifyContent="center" spacing={2}>
                      <Avatar
                        aria-label="recipe"
                        src="/static/mock-images/avatars/avatar_default.jpg"
                        sx={{ width: 70, height: 70, mt: 4 }}
                      />
                    </Stack>

                    <Typography
                      variant="body2"
                      mt={1}
                      mb={1}
                      className="user-detail-fs"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      <strong>{pageState.user?.name}</strong>
                    </Typography>
                    <Typography variant="body2" mb={2} className="user-detail-fs">
                      {pageState.user?.email}
                    </Typography>
                    <Typography variant="body2" mt={1} mb={2} className="user-detail-fs">
                      <span className="user-detail-role">
                        {userRole === 1 ? 'Admin' : userRole === 2 ? 'SEO' : 'User'}
                      </span>
                    </Typography>
                    <Typography variant="body2" mt={1} mb={2} className="user-detail-fs">
                      {moment(pageState.user?.updatedAt).format('MMMM Do YYYY - h:mm a')}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
};
export default UserProfile;
