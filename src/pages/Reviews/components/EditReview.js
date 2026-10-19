import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
// material
import {
  Stack,
  TextField,
  Typography,
  Button,
  Grid,
  FormLabel,
  CircularProgress
} from '@mui/material';
import Rating from '@mui/material/Rating';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import RichTextEditor from 'src/components/RichTextEditor';
import { singleReview, updateReview, API } from 'src/Redux/actions/reviewsActions';
import { createImageFile } from 'src/Redux/helpers/generalHelper';
//
import Loader from 'src/components/Loader';
// ----------------------------------------------------------------------
const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp'];
// Image Validation

export default function EditReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const pageState = useSelector((state) => state.reviews.items.review);
  const [pageSections, setPageSection] = useState({
    data: []
  });
  const formData = pageState;

  // Edit Review
  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState]);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        setTimeout(() => {
          dispatch(singleReview(id));
          setLoading(false);
        }, 2000);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  // Validation Schema for From
  const ReviewSchema = Yup.object().shape({
    authorName: Yup.string().required('Author name is required'),
    review: Yup.string().required('Review description is required')
  });

  return (
    <Grid container mx="auto" justifyContent="center">
      <Grid lg={8} md={8} xs={10} sm={10}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            {loading && <Loader />}
            {!loading && (
              <Formik
                enableReinitialize={true}
                initialValues={{
                  authorName: pageState?.authorName ? pageState.authorName : '',
                  authorEmail: pageState?.authorEmail ? pageState.authorEmail : '',
                  authorUrl: pageState?.authorUrl ? pageState.authorUrl : '',
                  rating: pageState?.rating ? pageState.rating : 5,
                  profile_picture: pageState?.profile_picture ? pageState?.profile_picture : '',
                  review: pageState?.review ? pageState.review : ''
                }}
                validationSchema={ReviewSchema}
                onSubmit={async (values) => {
                  const data = {
                    _id: id,
                    authorName: values.authorName ? values.authorName : '',
                    authorEmail: values.authorEmail ? values.authorEmail : '',
                    authorUrl: values.authorUrl ? values.authorUrl : '',
                    rating: values.rating ? values.rating : 5,
                    profile_picture: values.profile_picture ? values.profile_picture : '',
                    review: values.review ? values.review : ''
                  };
                  // Form Data
                  const newImage = values?.profile_picture;
                  const currImage = pageState?.profile_picture;
                  if (newImage !== currImage) {
                    const formData = new FormData();
                    const newImageFile = await createImageFile(values?.profile_picture);
                    formData.append('image', newImageFile);
                    try {
                      const res = await API({
                        url: '/uploads',
                        method: 'post',
                        data: formData
                      });
                      data.profile_picture = res.data.path;
                    } catch (error) {
                      console.log(error);
                    }
                  }
                  // Dispatch Action
                  dispatch(updateReview(data, navigate));
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                  }, 3000);
                }}
              >
                {({ errors, touched, setFieldValue, values }) => (
                  <Form autoComplete="off">
                    <Typography variant="h4" gutterBottom>
                      Edit Review
                    </Typography>
                    <Stack spacing={1} mt={2}>
                      <FormLabel id="authorName">Author Name</FormLabel>
                      <Field
                        type="text"
                        id="authorName"
                        name="authorName"
                        className="input-style"
                        placeholder="Enter Author Name"
                      />
                      {errors.authorName && touched.authorName ? (
                        <div className="error-color">{errors.authorName}</div>
                      ) : null}
                      <FormLabel id="authorEmail">Author Email</FormLabel>
                      <Field
                        type="text"
                        id="authorEmail"
                        name="authorEmail"
                        className="input-style"
                        placeholder="Enter Author Email"
                      />
                      {errors.authorEmail && touched.authorEmail ? (
                        <div className="error-color">{errors.authorEmail}</div>
                      ) : null}
                      <FormLabel id="authorUrl">Author URL</FormLabel>
                      <Field
                        type="text"
                        id="authorUrl"
                        name="authorUrl"
                        className="input-style"
                        placeholder="Enter Author URL"
                      />
                      {errors.authorUrl && touched.authorUrl ? (
                        <div className="error-color">{errors.authorUrl}</div>
                      ) : null}
                      <FormLabel id="review">Review Description</FormLabel>
                      <RichTextEditor
                        setFieldValue={setFieldValue}
                        name="review"
                        value={values.review}
                      />
                      {errors.review && touched.review ? (
                        <div className="error-color">{errors.review}</div>
                      ) : null}
                      <FormLabel id="rating">Rating</FormLabel>
                      <Grid container>
                        <Grid xs={6} sm={6} md={6} lg={6} mt={1}>
                          <Rating
                            name="simple-controlled"
                            value={values.rating}
                            onChange={(e, newValue) => {
                              setFieldValue('rating', newValue);
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container mb={1}>
                        <Grid xs={4} sm={4} md={4} lg={4} mt={2}>
                          <FormLabel id="image">Profile Preview</FormLabel>
                          {loading ? (
                            <CircularProgress />
                          ) : (
                            <LazyLoadImage
                              alt="No Profile Preview"
                              src={`${process.env.REACT_APP_NODE_ROOT}/uploads/${pageState?.profile_picture}`}
                              width="60"
                              height="60"
                            />
                          )}
                        </Grid>
                        <Grid xs={5} sm={5} md={5} lg={5} mt={2}>
                          <FormLabel id="profile_picture"> Upload New Profile Picture</FormLabel>
                          <br />
                          <TextField
                            sx={{ mt: 1 }}
                            id="file"
                            name="profile_picture"
                            type="file"
                            onChange={(e) => {
                              const image = e.target.files[0];
                              if (!validTypes.includes(image.type)) {
                                toast.error(
                                  'Please select an image, allowed file types are .jpg, .jpeg & .png.'
                                );
                                return false;
                              }
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                  setFieldValue('profile_picture', fileReader.result);
                                }
                              };
                              fileReader.readAsDataURL(image);
                            }}
                          />
                          {errors.profile_picture && touched.profile_picture ? (
                            <div className="error-color">{errors.profile_picture}</div>
                          ) : null}
                        </Grid>
                      </Grid>
                    </Stack>
                    <Grid container>
                      <Grid xs={4} sm={4} md={3} lg={2} mt={3}>
                        <LoadingButton
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          loading={loading}
                        >
                          Submit
                        </LoadingButton>
                      </Grid>
                      <Grid xs={4} sm={4} md={3} lg={2} ml={2} mt={3}>
                        <Button
                          fullWidth
                          size="large"
                          variant="contained"
                          color="error"
                          component={RouterLink}
                          to="/dashboard/reviews"
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
