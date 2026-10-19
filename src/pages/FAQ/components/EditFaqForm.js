import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
// material
import {
  Stack,
  Typography,
  Grid,
  FormLabel,
  CircularProgress,
  Button,
  MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Switch } from 'formik-mui';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import RichTextEditor from 'src/components/RichTextEditor';
// Actions
import { request } from 'src/Redux/helpers/axiosRequest';
import { singleFaq, updateFaq } from 'src/Redux/actions/faqsActions';
// ----------------------------------------------------------------------
// const label = { inputProps: { 'aria-label': 'Switch demo' } };

const EditFaqForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // Categories
  const [categories, setCategories] = useState([]);
  const [rteLoading, setRteLoading] = useState(false); // For RTE Loading
  const pageState = useSelector((state) => state.faqs.items);
  const [pageSections, setPageSection] = useState({
    data: []
  });
  const formData = pageState;

  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState.faqs]);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        dispatch(singleFaq(id));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  // For RTE
  useEffect(() => {
    setRteLoading(true);
    setTimeout(() => {
      setRteLoading(false);
    }, 1000);
  }, []);

  // Get All Categories
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
  const SectionSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required')
  });

  return (
    <>
      <Grid lg={8} md={8} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            {pageState.loading && 'Loading...'}
            {!pageState.loading && (
              <Formik
                enableReinitialize={true}
                initialValues={{
                  _id: id,
                  title: pageState.faq ? pageState.faq?.title : '',
                  description: pageState.faq ? pageState.faq?.description : '',
                  category: pageState.faq ? pageState.faq?.category : '',
                  active: pageState.faq ? pageState.faq.active : true
                }}
                validationSchema={SectionSchema}
                onSubmit={(values) => {
                  const faqId = pageState.faq._id;
                  dispatch(updateFaq(values, faqId));
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    navigate('/dashboard/pages/faqs');
                  }, 1000);
                }}
              >
                {({ errors, touched, values, setFieldValue }) => (
                  <Form autoComplete="off">
                    <Typography variant="h4" gutterBottom>
                      Edit FAQ
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
                      <RichTextEditor
                        setFieldValue={setFieldValue}
                        name="description"
                        value={values.description}
                      />
                      {errors.description && touched.description ? (
                        <div className="error-color">{errors.description}</div>
                      ) : null}
                      <FormLabel id="category">Package Category</FormLabel>
                      <Field
                        name="category"
                        value={values.category}
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
                      <FormLabel id="active">Active</FormLabel>
                      <FormControlLabel
                        control={<Field component={Switch} type="checkbox" name="active" />}
                        label="Active"
                      />
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
                      <Grid xs={4} sm={4} md={3} lg={2} ml={3} mt={3}>
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
            )}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
export default EditFaqForm;
