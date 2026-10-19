import { useState } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
// material
import { Stack, TextField, Typography, Button, Grid, FormLabel } from '@mui/material';
import Rating from '@mui/material/Rating';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import RichTextEditor from 'src/components/RichTextEditor';
//
import { addReview, API } from 'src/Redux/actions/reviewsActions';
import { createImageFile } from 'src/Redux/helpers/generalHelper';
//
// ----------------------------------------------------------------------
const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp'];
// Image Validation

export default function AddReview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
            <Formik
              enableReinitialize={true}
              initialValues={{
                authorName: '',
                authorEmail: '',
                authorUrl: '',
                rating: 5,
                profile_picture: '',
                review: ''
              }}
              validationSchema={ReviewSchema}
              onSubmit={async (values) => {
                const data = {
                  authorName: values.authorName ? values.authorName : '',
                  authorEmail: values.authorEmail ? values.authorEmail : '',
                  authorUrl: values.authorUrl ? values.authorUrl : '',
                  rating: values.rating ? values.rating : 5,
                  profile_picture: values.profile_picture ? values.profile_picture : '',
                  review: values.review ? values.review : ''
                };
                // Form Data
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
                // Dispatch Action
                dispatch(addReview(data, navigate));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 3000);
              }}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Add New Review
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
                    <RichTextEditor setFieldValue={setFieldValue} name="review" />
                    {errors.review && touched.review ? (
                      <div className="error-color">{errors.review}</div>
                    ) : null}
                    <FormLabel id="rating">Rating</FormLabel>
                    <Rating
                      name="simple-controlled"
                      value={values.rating}
                      onChange={(e, newValue) => {
                        setFieldValue('rating', newValue);
                      }}
                    />
                    <Grid container>
                      <Grid xs={6} sm={6} md={6} lg={6} mt={2}>
                        <FormLabel id="profile_picture"> Upload Profile Picture</FormLabel>
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
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
