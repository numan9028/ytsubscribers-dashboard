import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import { TextField } from 'formik-mui';
import { request } from 'src/Redux/helpers/axiosRequest';
// material
import { Stack, Typography, Button, Grid, FormLabel, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import RichTextEditor from 'src/components/RichTextEditor';
//
import { singleCategory, updateCategory } from 'src/Redux/actions/categoryActions';

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [rteLoading, setRteLoading] = useState(false); // For RTE Loading
  const pageState = useSelector((state) => state.categories.items);
  const [categories, setCategories] = useState([]);
  const [pageSections, setPageSection] = useState({
    data: []
  });
  const formData = pageState;

  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState.categories]);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        dispatch(singleCategory(id));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

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

  // For RTE
  useEffect(() => {
    setRteLoading(true);
    setTimeout(() => {
      setRteLoading(false);
    }, 1000);
  }, []);

  // Validation Schema for From
  // const CategorySchema = Yup.object().shape({
  //   categoryName: Yup.string().required('Category Name is required'),
  //   categorySlug: Yup.string().required('Category Slug is required'),
  //   longDescription: Yup.string().required('Long Description is required'),
  //   canonicalLink: Yup.string().required('Canonical Link is required'),
  //   metaTitle: Yup.string().required('Meta Title is required'),
  //   metaDescription: Yup.string().required('Meta Description is required'),
  //   serviceId: Yup.string().required('Service Id is required')
  // });

  return (
    <Grid container>
      <Grid lg={10} md={10} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275, pl: 5, pt: 2 }}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={pageState}
              // validationSchema={CategorySchema}
              onSubmit={async (values) => {
                dispatch(updateCategory(values, navigate));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 3000);
              }}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Update Package Category
                  </Typography>
                  <Stack spacing={1} mt={2}>
                    <FormLabel id="categoryName">Category Name</FormLabel>
                    <Field
                      type="text"
                      id="categoryName"
                      name="categoryName"
                      className="input-style"
                      placeholder="Enter Category Name"
                      required
                    />
                    {errors.categoryName && touched.categoryName ? (
                      <div className="error-color">{errors.categoryName}</div>
                    ) : null}
                    <FormLabel id="parent">Parent Category</FormLabel>
                    <Field
                      name="parent"
                      select
                      component={TextField}
                      sx={{ width: '93.5%' }}
                      label="Select Value"
                      // value={values.parent}
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
                    <FormLabel id="categorySlug">Category Slug</FormLabel>
                    <Field
                      type="text"
                      id="categorySlug"
                      name="categorySlug"
                      className="input-style"
                      placeholder="Enter Category Slug"
                      required
                    />
                    {errors.categorySlug && touched.categorySlug ? (
                      <div className="error-color">{errors.categorySlug}</div>
                    ) : null}
                    <FormLabel id="serviceId">Service Id</FormLabel>
                    <Field
                      type="number"
                      id="serviceId"
                      name="serviceId"
                      className="input-style"
                      placeholder="Enter Service Id"
                      min={0}
                      onWheel={(e) => e.target.blur()}
                      required
                    />
                    {errors.serviceId && touched.serviceId ? (
                      <div className="error-color">{errors.serviceId}</div>
                    ) : null}
                    <FormLabel id="longDescription">Long Description</FormLabel>
                    <RichTextEditor
                      setFieldValue={setFieldValue}
                      name="longDescription"
                      value={values.longDescription}
                    />
                    {errors.longDescription && touched.longDescription ? (
                      <div className="error-color">{errors.longDescription}</div>
                    ) : null}
                    <FormLabel id="canonicalLink">Canonical Link</FormLabel>
                    <Field
                      type="text"
                      id="canonicalLink"
                      name="canonicalLink"
                      className="input-style"
                      placeholder="Enter Category Canonical Link"
                    />
                    {errors.canonicalLink && touched.canonicalLink ? (
                      <div className="error-color">{errors.canonicalLink}</div>
                    ) : null}
                    <FormLabel id="metaTitle">Meta Title</FormLabel>
                    <Field
                      type="text"
                      id="metaTitle"
                      name="metaTitle"
                      className="input-style"
                      placeholder="Enter Category Meta Title"
                    />
                    {errors.metaTitle && touched.metaTitle ? (
                      <div className="error-color">{errors.metaTitle}</div>
                    ) : null}
                    <FormLabel id="metaDescription">Meta Description</FormLabel>
                    <Field
                      type="text"
                      id="metaDescription"
                      name="metaDescription"
                      className="input-style"
                      placeholder="Enter Category Meta Description"
                    />
                    {errors.metaDescription && touched.metaDescription ? (
                      <div className="error-color">{errors.metaDescription}</div>
                    ) : null}
                     <FormLabel id="servicesSchema">Schema</FormLabel>
                    <Field
                      type="text"
                      id="servicesSchema"
                      name="servicesSchema"
                      className="input-style"
                      placeholder="Enter Services Schema"
                    />
                    {errors.servicesSchema && touched.servicesSchema ? (
                      <div className="error-color">{errors.servicesSchema}</div>
                    ) : null}
                    <FormLabel id="homePgHeading">Main Service Home page Heading</FormLabel>
                    <Field
                      type="text"
                      id="homePgHeading"
                      name="homePgHeading"
                      className="input-style"
                      placeholder="Enter Main Service Home Page Heading"
                    />
                    {errors.homePgHeading && touched.homePgHeading ? (
                      <div className="error-color">{errors.homePgHeading}</div>
                    ) : null}
                     <FormLabel id="homePgDescription">Main Service Home page Description</FormLabel>
                    <Field
                      type="text"
                      id="homePgDescription"
                      name="homePgDescription"
                      className="input-style"
                      placeholder="Enter Main Service Home Page Description"
                      
                    />
                    {errors.homePgDescription && touched.homePgDescription ? (
                      <div className="error-color">{errors.categorySlug}</div>
                    ) : null}
                    {/* HTB - START*/}
                    {values.categoryMeta?.howToBuy?.length &&
                      values.categoryMeta?.howToBuy?.map((items, idx) => {
                        return (
                          <FieldArray name="categoryMeta.howToBuy">
                            {({ remove, push }) => (
                              <>
                                <div className="row" key={idx}>
                                  <h2 className="mt-5">How To Buy</h2>
                                  <div className="col">
                                    <Button
                                      type="button"
                                      variant="contained"
                                      color="secondary"
                                      sx={{ mb: 2 }}
                                      onClick={() =>
                                        push({ title: '', shortDescription: '', position: '' })
                                      }
                                    >
                                      Add Section
                                    </Button>
                                    {idx == 1 && (
                                      <Button
                                        type="button"
                                        sx={{ ml: 2, mb: 2, mr: 3 }}
                                        variant="contained"
                                        color="error"
                                        onClick={() => remove(idx)}
                                        className="home-section-delete-button"
                                      >
                                        Delete Section
                                      </Button>
                                    )}
                                  </div>
                                  <div className="col">
                                    <div className="input-section">
                                      <FormLabel htmlFor={`categoryMeta.howToBuy[${idx}].title`}>
                                        Title
                                      </FormLabel>
                                      <Field
                                        id={`categoryMeta.howToBuy[${idx}].title`}
                                        name={`categoryMeta.howToBuy[${idx}].title`}
                                        type="text"
                                        placeholder="Enter Title"
                                        className="input-style"
                                      />
                                      <ErrorMessage
                                        name={`categoryMeta.howToBuy[${idx}].title`}
                                        component="div"
                                        className="error-color"
                                      />
                                    </div>
                                    <div className="input-section">
                                      <FormLabel
                                        htmlFor={`categoryMeta.howToBuy[${idx}].shortDescription`}
                                      >
                                        short Description
                                      </FormLabel>
                                      <Field
                                        id={`categoryMeta.howToBuy[${idx}].shortDescription`}
                                        name={`categoryMeta.howToBuy[${idx}].shortDescription`}
                                        type="text"
                                        placeholder="Enter Description"
                                        className="input-style"
                                      />
                                      <ErrorMessage
                                        name={`categoryMeta.howToBuy[${idx}].shortDescription`}
                                        component="div"
                                        className="error-color"
                                      />
                                    </div>
                                    <div className="input-section">
                                      <FormLabel htmlFor={`categoryMeta.howToBuy[${idx}].position`}>
                                        Position
                                      </FormLabel>
                                      <Field
                                        id={`categoryMeta.howToBuy[${idx}].position`}
                                        name={`categoryMeta.howToBuy[${idx}].position`}
                                        type="text"
                                        placeholder="Enter Position"
                                        className="input-style"
                                      />
                                      <ErrorMessage
                                        name={`categoryMeta.howToBuy[${idx}].position`}
                                        component="div"
                                        className="error-color"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </FieldArray>
                        );
                      })}
                    {/* HTB - END */}
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
                        to="/dashboard/package-category"
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
