// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { AppNewUsers, AppBugReports, AppItemOrders, TotalOrders } from '../sections/@dashboard/app';
//
import { AppReviews } from '../sections/@dashboard/app/ForOtherUsers/AppReviews';
import { AppCoupons } from '../sections/@dashboard/app/ForOtherUsers/AppCoupons';
import { AppFaqs } from '../sections/@dashboard/app/ForOtherUsers/AppFaqs';
import { AppBlogs } from '../sections/@dashboard/app/ForOtherUsers/AppBlogs';
//
import withRole from 'src/components/HOC/withRole';
import Orders from '../pages/Orders/Orders';
import Coupons from '../pages/Coupons/Coupons';
// ----------------------------------------------------------------------
function DashboardApp(props) {
  // Check User Role
  const userRole = props.user.userRole;

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          {userRole == '1' ? (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <TotalOrders />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppNewUsers />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppItemOrders />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppBugReports />
              </Grid>
              {/* All Order Table */}
              <Grid item xs={12} sm={12} md={12}>
                <Orders title="Dashboard" />
              </Grid>
            </>
          ) : (
            <>
              {/* For Users */}
              <Grid item xs={12} sm={6} md={3}>
                <AppReviews />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppFaqs />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppCoupons />
              </Grid>{' '}
              <Grid item xs={12} sm={6} md={3}>
                <AppBlogs />
              </Grid>
              {/* All Order Table */}
              <Grid item xs={12} sm={12} md={12}>
                <Coupons userRole={userRole} title="Dashboard" />
              </Grid>
              {/*  */}
            </>
          )}
        </Grid>
      </Container>
    </Page>
  );
}

export default withRole(DashboardApp);