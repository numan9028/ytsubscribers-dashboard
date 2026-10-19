import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { sentenceCase } from 'change-case';
import withRole from 'src/components/HOC/withRole';
// material
import { Grid, Container, Stack, Typography, Button, Box, Card, CardContent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// components
import Page from 'src/components/Page';
import Loader from 'src/components/Loader';
import Label from 'src/components/Label';
//
import { singleOrder } from 'src/Redux/actions/ordersActions';

const OrderDetails = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const pageState = useSelector((state) => state.orders.items);
  // For User Role
  const userRole = props.user.userRole;
  const [state, setState] = useState({});

  const [pageSections, setPageSection] = useState({});
  const formData = pageState;

  // For Order Details
  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState.order]);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        dispatch(singleOrder(id));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
    const type = userRole == 1 ? null : navigate('/dashboard/app');
    return () => {
      setState({});
      return type;
    };
  }, []);

  return (
    <Page title="Dashboard: Pages | Order Details">
      <Container>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            Order Detail
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/dashboard/orders"
            startIcon={<ArrowBackIcon />}
          >
            Go Back to Orders
          </Button>
        </Stack>
        {loading && <Loader />}
        {!loading && pageState.order && (
          <Grid container display="flex" alignItems="start" justifyContent="start" spacing={1}>
            <Grid item lg={6} md={6} xs={12} sm={12} mt={2}>
              <Box sx={{ boxShadow: 3, borderRadius: '16px' }} key={pageState.order?._id}>
                <Card sx={{ maxWidth: '100%' }}>
                  <CardContent>
                    <Typography variant="body2" mt={1} mb={2} sx={{ fontSize: 17 }}>
                      <strong>User Email:</strong> {pageState.order.userEmail}
                    </Typography>
                    <strong>Payment Status:</strong>
                    <Label
                      variant="ghost"
                      sx={{ ml: 1 }}
                      color={
                        (pageState.order.paymentStatus === 'initiated' && 'warning') || 'success'
                      }
                    >
                      {sentenceCase(pageState.order.paymentStatus)}
                    </Label>
                    <Typography variant="body2" mt={3} mb={2} sx={{ fontSize: 17 }}>
                      <strong> Original Price: </strong>
                      {pageState.order.currency}
                      {pageState.order.itemPrice}
                    </Typography>
                    <Typography variant="body2" mt={3} mb={2} sx={{ fontSize: 17 }}>
                      <strong> Amount Paid: </strong>
                      {pageState.order.currency}
                      {pageState.order.amountPaid}
                    </Typography>
                    <Typography variant="body2" mt={2} mb={2} sx={{ fontSize: 17 }}>
                      <strong>Payment IntentId:</strong> {pageState.order.paymentIntentId}
                    </Typography>
                    <Typography variant="body2" mt={3} mb={2} sx={{ fontSize: 17 }}>
                      <strong> Promo Used: </strong>
                      {pageState.order.promoId ? ' Yes' : ' No'}
                    </Typography>
                    <Typography variant="body2" mt={3} mb={2} sx={{ fontSize: 17 }}>
                      <strong> Promo Code: </strong>
                      {pageState.order.promo?.promoCode}
                    </Typography>
                    <Typography variant="body2" mt={3} mb={2} sx={{ fontSize: 17 }}>
                      <strong> Tracking Id: </strong>
                      {pageState.order.orderId}
                    </Typography>
                    <Typography variant="body2" mt={3} mb={2} sx={{ fontSize: 17 }}>
                      <strong> Order Date: </strong>
                      {moment(pageState.order.orderDate).format('MMMM Do, YYYY')}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        )}
        {pageState.order?.orderItems.length > 0 && (
          <Typography variant="h4" gutterBottom mt={3}>
            Order Items
          </Typography>
        )}
        <Grid container display="flex">
          {pageState.order &&
            pageState.order.orderItems?.map((items, index) => {
              return (
                <Grid key={items._id} item lg={6} md={6} xs={12} sm={12} mt={2}>
                  <Box sx={{ maxWidth: '98%', boxShadow: 3, borderRadius: '16px' }}>
                    <Card>
                      <CardContent>
                        <Typography
                          mt={1}
                          mb={2}
                          variant="body2"
                          sx={{ fontSize: 17, textTransform: 'capitalize' }}
                        >
                          <strong>Service Type:</strong> {items.serviceType}
                        </Typography>
                        <Typography variant="body2" mt={1} mb={2} sx={{ fontSize: 17 }}>
                          <strong>Quantity:</strong> {items.quantity} Items
                        </Typography>
                        <Typography variant="body2" mt={1} mb={2} sx={{ fontSize: 17 }}>
                          <strong>Channel / Video Link:</strong>{' '}
                          <a href={items.link} className="order-details-link" target="_blank">
                            {items.link}
                          </a>
                        </Typography>
                        <Typography variant="body2" mt={1} mb={2} sx={{ fontSize: 17 }}>
                          <strong>API Order Id:</strong> {items.apiOrderId}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
        {pageState.order?.orderAddOns.length > 0 && (
          <Typography variant="h4" gutterBottom mt={3}>
            Order Addons
          </Typography>
        )}
        <Grid container display="flex">
          {pageState.order?.orderAddOns
            ? pageState.order.orderAddOns?.map((items, index) => {
              return (
                <Grid key={items._id} item lg={6} md={6} xs={12} sm={12} mt={2}>
                  <Box sx={{ maxWidth: '98%', boxShadow: 3, borderRadius: '16px' }}>
                    <Card>
                      <CardContent>
                        <Typography
                          mt={1}
                          mb={2}
                          variant="body2"
                          sx={{ fontSize: 17, textTransform: 'capitalize' }}
                        >
                          <strong>Addon Title:</strong> {items.title}
                        </Typography>
                        <Typography variant="body2" mt={1} mb={2} sx={{ fontSize: 17 }}>
                          <strong>Quantity:</strong> {items.quantity}
                        </Typography>
                        <Typography variant="body2" mt={1} mb={2} sx={{ fontSize: 17 }}>
                          <strong>Price:</strong> £{items.price}
                        </Typography>
                        <Typography variant="body2" mt={1} mb={2} sx={{ fontSize: 17 }}>
                          <strong>Discount:</strong> {items.discount}%
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              );
            })
            : []}
        </Grid>
      </Container>
    </Page>
  );
};
export default withRole(OrderDetails);
