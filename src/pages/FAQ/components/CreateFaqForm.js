import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
// material
import {
  Stack,
  Typography,
  Grid,
  FormLabel,
  Button,
  MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import RichTextEditor from 'src/components/RichTextEditor';
import { request } from 'src/Redux/helpers/axiosRequest';
// Actions
import { addFAQ } from 'src/Redux/actions/faqsActions';
//

export default function CreateFaqForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Get All Categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/category/get-all`,
      method: "GET",
      data: null
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        setCategories(data.categories);
        setLoading(false);
      });
  }, []);

  // Validation Schema for From
  const FaqsSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required')
    // category: Yup.string().required('Category is required')
  });

  return (
    <Grid container direction="grid" justifyContent="center" mx="auto">
      <Grid item lg={8} md={8} xs={10} sm={10}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={{
                title: '',
                description: '',
                category: '',
                active: true
              }}
              validationSchema={FaqsSchema}
              onSubmit={(values) => {
                console.log('values', values);
                dispatch(addFAQ(values, navigate));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Add New FAQ
                  </Typography>
                  <Stack spacing={1} mt={2}>
                    <FormLabel id="title">Title</FormLabel>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className="input-style"
                      placeholder="Enter Faq Title"
                    />
                    {errors.title && touched.title ? (
                      <div className="error-color">{errors.title}</div>
                    ) : null}
                    <FormLabel id="description">Description</FormLabel>
                    <RichTextEditor setFieldValue={setFieldValue} name="description" />

                    {errors.description && touched.description ? (
                      <div className="error-color">{errors.description}</div>
                    ) : null}
                    <FormLabel id="category">Package Category</FormLabel>
                    <Field
                      name="category"
                      select
                      defaultValue=""
                      component={TextField}
                      sx={{ width: '60%' }}
                      label="Select Value"
                    >
                      <MenuItem value="">Not Selected</MenuItem>
                      {categories?.map((item) => {
                        return (
                          <MenuItem value={item._id} label={item.categoryName} key={item._id}>
                            {item.categoryName}
                          </MenuItem>
                        );
                      })}
                    </Field>
                  </Stack>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} mt={3}>
                      <FormLabel id="active" sx={{ mt: 1, mb: 1 }}>
                        Active
                      </FormLabel>{' '}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} mt={1}>
                      <Field type="checkbox" id="active" name="active" className="checkbox-style" />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={4} sm={4} md={3} lg={2} mt={3}>
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
                    <Grid item xs={4} sm={4} md={3} lg={2} ml={3} mt={3}>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="error"
                        component={RouterLink}
                        to="/dashboard/pages/faqs"
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
