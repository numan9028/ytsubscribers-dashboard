import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as moment from 'moment';
// material
import { Grid, Container, Stack, Typography, Button, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Rating from '@mui/material/Rating';
// components
import Page from '../../components/Page';
import Loader from '../../components/Loader';
import Iconify from '../../components/Iconify';
import ActionButtonReviews from './components/ActionButtonReviews';
import { createMarkup, decodeEntities } from '../../Redux/helpers/generalHelper';
// -------------------------------Action-----------------------------------
import { pendingReviews } from '../../Redux/actions/reviewsActions';

const CategoryReviews = () => {
  const dispatch = useDispatch();
  const pageState = useSelector((state) => state.reviews.items);
  console.log("pageState: ")
  const [loading, setLoading] = useState(false);
  const [pageSections, setPageSection] = useState({
    data: []
  });
  const formData = pageState;

  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState.reviews]);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        setTimeout(() => {
          dispatch(pendingReviews());
          setLoading(false);
        }, 1000);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  return (
    <Page title="Dashboard: Reviews">
      <Container>
        <Stack direction="row" justifyContent="space-between" mb={3} mr={1}>
          <Typography variant="h4" gutterBottom>
            PENDING REVIEWS
          </Typography>
          {/* <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/dashboard/reviews/add-review"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            ADD NEW REVIEW
          </Button> */}
        </Stack>
        <Grid container display="flex" alignItems="center" justifyContent="center" spacing={1}>
          {loading ? <Loader /> : !pageState.reviews?.length > 0 && 'No Review Yet'}
          {!loading &&
            pageState.reviews?.map((item) => {
              const date = item.createdAt;
              const review = `${item.review.substring(0, 200)}...`;
              return (
                <Grid lg={6} md={6} xs={12} sm={12} mt={2}>
                  <Box>
                    <Card sx={{ maxWidth: 495, boxShadow: 3 }}>
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            src={
                              item?.profile_picture
                                ? `${process.env.REACT_APP_NODE_ROOT}/uploads/${item?.profile_picture}`
                                : 'static/no-preview.jpg'
                            }
                            sx={{ width: 50, height: 50 }}
                          />
                        }
                        action={<ActionButtonReviews id={item._id} active={item.active} />}
                        title={item.authorName}
                        subheader={moment(date).format('MMMM Do YYYY - h:mm a')}
                      />

                      <CardContent>
                        <Rating name="read-only" value={item.rating} readOnly mt={1} />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          dangerouslySetInnerHTML={createMarkup(decodeEntities(review))}
                        />
                        <Typography variant="body2" color="primary.main" mt={0.5}>
                          <strong>Author Email:</strong> {item.authorEmail}
                        </Typography>
                        <Typography variant="body2" color="primary.main" mt={0.5}>
                          <strong>Author URL: </strong>
                          {item.authorUrl}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon />
                        </IconButton>
                        <Typography style={{width:"100%", textAlign:"right", color:"black"}} variant="body2" color="primary.main" mt={0.5}>
                          <strong>Status: </strong>
                          {item.active ? (
                            <span style={{ backgroundColor: "green",color:"white",padding:"4px", borderRadius:"5px",marginLeft:"4px",marginRight:"16px" }}>Active</span> 
                          ) : (
                            <span style={{ backgroundColor: "red",color:"white",padding:"4px", borderRadius:"5px",marginLeft:"4px",marginRight:"16px" }} >Pending</span> 
                          )}
                        </Typography>

                      </CardActions>
                    </Card>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Page>
  );
};
export default CategoryReviews;
