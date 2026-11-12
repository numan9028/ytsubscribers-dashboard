import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { sentenceCase } from 'change-case';
import withRole from 'src/components/HOC/withRole';
// material
import {
  Grid,
  Container,
  Stack,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// components
import Page from 'src/components/Page';
import Loader from 'src/components/Loader';
import Label from 'src/components/Label';
import OrderActionButton from './OrderActionButton';
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
  const orderItems = pageState.order?.orderItems || [];
  const itemGroups = orderItems.reduce((groups, item) => {
    const packageId =
      typeof item.packageId === 'object' ? item.packageId?._id : item.packageId;
    const durationId =
      typeof item.packageDurationId === 'object'
        ? item.packageDurationId?._id
        : item.packageDurationId;
    const key = `${packageId || item.serviceId || item.serviceType || 'item'}-${durationId || ''}`;
    if (!groups[key]) {
      groups[key] = { key, items: [] };
    }
    groups[key].items.push(item);
    return groups;
  }, {});

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
        {orderItems.length > 0 && (
          <Typography variant="h4" gutterBottom mt={3}>
            Order Items
          </Typography>
        )}
        {orderItems.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 2, border: 1, borderColor: 'grey.300' }}>
            <Table aria-label="Order items" sx={{ minWidth: 760 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Items</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Service ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Package Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(itemGroups).map((group) => {
                  const firstItem = group.items[0];
                  const packageDetails =
                    typeof firstItem.packageId === 'object' ? firstItem.packageId : {};
                  const durationDetails =
                    typeof firstItem.packageDurationId === 'object'
                      ? firstItem.packageDurationId
                      : {};
                  const price = durationDetails.priceDuration ?? packageDetails.price;
                  return (
                    <React.Fragment key={group.key}>
                      <TableRow>
                        <TableCell>{group.items.length}</TableCell>
                        <TableCell>
                          {packageDetails.packageTitle || sentenceCase(firstItem.serviceType || '')}
                        </TableCell>
                        <TableCell>{firstItem.serviceId || '—'}</TableCell>
                        <TableCell>{packageDetails.quantity ?? firstItem.quantity ?? '—'}</TableCell>
                        <TableCell>
                          {price == null ? '—' : `${pageState.order.currency || ''}${price}`}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={5} sx={{ py: 0 }}>
                          <Box sx={{ py: 2, px: 1 }}>
                            <Typography variant="subtitle1" fontWeight={700} align="center" mb={1}>
                              Order Posts
                            </Typography>
                            <Table
                              size="small"
                              aria-label="Order posts"
                              sx={{ tableLayout: 'fixed', width: '100%' }}
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell sx={{ width: '12%', fontWeight: 700 }}>Post ID</TableCell>
                                  <TableCell sx={{ width: '12%', fontWeight: 700 }}>
                                    Per Post
                                  </TableCell>
                                  <TableCell sx={{ width: '15%', fontWeight: 700 }}>API Id</TableCell>
                                  <TableCell
                                    sx={{ width: 300, minWidth: 300, maxWidth: 300, fontWeight: 700 }}
                                  >
                                    Comments
                                  </TableCell>
                                  <TableCell sx={{ width: 130, fontWeight: 700 }}>Action</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {group.items.map((item) => (
                                  <TableRow key={item._id}>
                                    <TableCell>
                                      {item.link ? (
                                        <a
                                          href={item.link}
                                          className="order-details-link"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          Link
                                        </a>
                                      ) : (
                                        '—'
                                      )}
                                    </TableCell>
                                    <TableCell>{item.quantity ?? '—'}</TableCell>
                                    <TableCell>{item.apiOrderId || '—'}</TableCell>
                                    <TableCell
                                      sx={{
                                        width: 300,
                                        minWidth: 300,
                                        maxWidth: 300,
                                        whiteSpace: 'normal',
                                        overflowWrap: 'anywhere'
                                      }}
                                    >
                                      {item.comments ? item.comments : <em>empty</em>}
                                    </TableCell>
                                    <TableCell>
                                      <OrderActionButton item={item} />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
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
