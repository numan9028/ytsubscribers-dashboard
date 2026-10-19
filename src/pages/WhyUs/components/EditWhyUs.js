import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
// import { TextField } from 'formik-mui';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
// material
import { Stack, Typography, Button, Grid, FormLabel, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import { request } from 'src/Redux/helpers/axiosRequest';
import SelectCategory from './SelectCategory';
import { singlePageSectionById, updatePageSection } from 'src/Redux/actions/pageSectionActions';
// Image Validation
const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export default function EditWhyUs() {
  const id = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [rteLoading, setRteLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Single Seciton
  const pageState = useSelector((state) => state.pageSections);
  const [pageSections, setPageSection] = useState({
    data: []
  });
  const formData = pageState;

  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState.items]);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        dispatch(singlePageSectionById(id.edit));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  // Get All Categories
  useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/category/get-all`,
      method: 'GET',
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
  const SectionSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    categoryId: Yup.string().required('Category is required')
  });

  return (
    <Grid container>
      <Grid lg={10} md={10} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275, pl: 5, pt: 2 }}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={pageState.items}
              // validationSchema={SectionSchema}
              onSubmit={async (values) => {
                dispatch(updatePageSection(values, id.edit));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  navigate('/dashboard/why-us');
                }, 2000);
              }}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Edit Why Us
                  </Typography>
                  <Stack spacing={1} mt={2}>
                    <FormLabel id="sectionName">Section Name</FormLabel>
                    <Field
                      type="text"
                      id="sectionName"
                      name="sectionName"
                      className="input-style"
                      placeholder="Enter Section Name"
                    />
                    {errors.sectionName && touched.sectionName ? (
                      <div className="error-color">{errors.sectionName}</div>
                    ) : null}
                    <FormLabel id="categoryId">Section Category</FormLabel>
                    <SelectCategory
                      categories={categories}
                      name="categoryId"
                      data={values.categoryId}
                    />
                    <h2 className="mt-5">Why Us Columns</h2>
                    {values.sectionMeta?.whyus_cols?.length &&
                      values.sectionMeta?.whyus_cols?.map((items, idx) => {
                        return (
                          <FieldArray name="sectionMeta.whyus_cols">
                            {({ remove, push }) => (
                              <>
                                <div className="row" key={idx}>
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
                                    {idx !== 0 && (
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
                                      <FormLabel htmlFor={`sectionMeta.whyus_cols[${idx}].title`}>
                                        Column Title
                                      </FormLabel>
                                      <Field
                                        id={`sectionMeta.whyus_cols[${idx}].title`}
                                        name={`sectionMeta.whyus_cols[${idx}].title`}
                                        type="text"
                                        placeholder="Enter Title"
                                        className="input-style"
                                      />
                                      <ErrorMessage
                                        name={`sectionMeta.whyus_cols[${idx}].title`}
                                        component="div"
                                        className="error-color"
                                      />
                                    </div>
                                    <div className="input-section">
                                      <FormLabel
                                        htmlFor={`sectionMeta.whyus_cols[${idx}].shortDescription`}
                                      >
                                        Column Description
                                      </FormLabel>
                                      <Field
                                        id={`sectionMeta.whyus_cols[${idx}].shortDescription`}
                                        name={`sectionMeta.whyus_cols[${idx}].shortDescription`}
                                        type="text"
                                        placeholder="Enter Description"
                                        className="input-style"
                                      />
                                      <ErrorMessage
                                        name={`sectionMeta.whyus_cols[${idx}].shortDescription`}
                                        component="div"
                                        className="error-color"
                                      />
                                    </div>
                                    <div className="input-section">
                                      <FormLabel
                                        htmlFor={`sectionMeta.whyus_cols[${idx}].position`}
                                      >
                                        Column Position
                                      </FormLabel>
                                      <Field
                                        id={`sectionMeta.whyus_cols[${idx}].position`}
                                        name={`sectionMeta.whyus_cols[${idx}].position`}
                                        type="text"
                                        placeholder="Enter Position"
                                        className="input-style"
                                      />
                                      <ErrorMessage
                                        name={`sectionMeta.whyus_cols[${idx}].position`}
                                        component="div"
                                        className="error-color"
                                      />
                                    </div>
                                    <Grid item xs={10} sm={10} md={6} lg={6} mt={2}>
                                      <FormLabel htmlFor={`sectionMeta.whyus_cols[${idx}].image`}>
                                        Change Image
                                      </FormLabel>
                                      <TextField
                                        value={values.icon}
                                        sx={{ mt: 1 }}
                                        id="file"
                                        name={`sectionMeta.whyus_cols[${idx}].icon`}
                                        type="file"
                                        onChange={(e) => {
                                          const image = e.target.files[0];
                                          if (!validTypes.includes(image.type)) {
                                            toast.error(
                                              'Please select an image, allowed file types are .jpg, .jpeg, .png & .webp.'
                                            );
                                            return false;
                                          }
                                          let imgLen = image.size <= 2000000;
                                          if (!imgLen) {
                                            toast.error('Image Size Should be less than 2Mbs.');
                                            return false;
                                          }
                                          // setFieldValue(
                                          //   `sectionMeta.whyus_cols[${idx}].icon`,
                                          //   image
                                          // );
                                          console.log('sidasd', image);

                                          const fileReader = new FileReader();
                                          fileReader.onload = () => {
                                            if (fileReader.readyState === 2) {
                                              setFieldValue(
                                                `sectionMeta.whyus_cols[${idx}].icon`,
                                                fileReader.result
                                              );
                                            }
                                          };
                                          fileReader.readAsDataURL(image);
                                        }}
                                      />
                                    </Grid>
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
                    <Grid xs={4} sm={4} md={3} lg={2} mt={3} item>
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
                    <Grid xs={4} sm={4} md={3} lg={2} ml={2} mt={3} item>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="error"
                        component={RouterLink}
                        to="/dashboard/why-us"
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
