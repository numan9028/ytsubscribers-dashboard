import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
// material
import { Stack, Typography, Button, Grid, FormLabel, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import RichTextEditor from 'src/components/RichTextEditor';
import MultipleSelectChip from './MultipleSelectChip';
import { request } from 'src/Redux/helpers/axiosRequest';
//
import { addPackage } from 'src/Redux/actions/packageActions';
import { DataGrid } from '@mui/x-data-grid';
import Iconify from 'src/components/Iconify';
import AddPkgDurationDialog from './AddPkgDurationDialog';
import { split } from 'lodash';
import ActionButtonAddPkgDurations from '../ActionButtonAddPkgDuration';

export default function AddPackage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [personName, setPersonName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pkgDurationDialogOpen, setPkgDurationDialogOpen] = useState(false);
  // const [durations, setDurations] = useState([]);
  const [pkgDuration, setPkgDuration] = useState([]);
  const handleDuration = (values) => {
    const [durationId, durationTitle]=split(values.durationId,',');
    let isDuplicate;
    setPkgDuration(prevPkgDuration => {
      isDuplicate = prevPkgDuration.some(pkg => pkg.durationId == durationId);
      if (isDuplicate) {
        return [...prevPkgDuration];
      }
      let newDurationObj ={
        durationId,
        durationTitle,
        priceDuration:values.priceDuration
      };
      return [...prevPkgDuration, newDurationObj];
    });
    if (isDuplicate){
      return false
    }else {
      return true
    }
  };
  const handleDeleteDuration = (itemId) => {
    setPkgDuration(prevPkgDuration => prevPkgDuration.filter(item => item['durationId'] !== itemId));

  };


  const rowsDuration=pkgDuration ;



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
 
  const columns = [

    { field: 'durationTitle', headerName: 'Duration title', width: 400 },
    {
      field: 'priceDuration',
      headerName: 'price',
      width: 200
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      renderCell: (value) => <ActionButtonAddPkgDurations value={value.row.action} id={value.row.durationId} handleDeleteDuration={handleDeleteDuration} />
    }
  ];
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
  const PackageSchema = Yup.object().shape({
    packageTitle: Yup.string().required('Package Title is required'),
    packageSlug: Yup.string().required('Package Slug is required'),
    quantity: Yup.string().required('Quantity is required'),
    price: Yup.string().required('Price is required'),
    categoryId: Yup.string().required('Package Category is required'),
    priceUnit: Yup.string().required('Price Unit is required'),
    // delieveryTime: Yup.string().required('Delievery Time is required'),
    serviceType: Yup.string().required('Service Type is required'),
    // pckgDescription: Yup.string().required('Package Description is required')
  });

  return (
    <Grid container>
      <Grid item lg={10} md={10} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275, p: 4 }}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={{
                packageTitle: '',
                categoryId: '',
                packageSlug: '',
                quantity: '',
                price: '',
                priceUnit: '',
                delieveryTime: '',
                serviceType: '',
                active: true,
                pckgDescription: '',
                metaTitle: '',
                metaDescription: '',
                canonicalLink: '',
                addons: []
              }}
              validationSchema={PackageSchema}
              onSubmit={async (values) => {
                values.packageDuration=pkgDuration;
                dispatch(addPackage(values, navigate));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 3000);
              }}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Add New Package
                  </Typography>
                  <Stack spacing={1} mt={2}>
                    <FormLabel id="packageTitle">Package Title</FormLabel>
                    <Field
                      type="text"
                      id="packageTitle"
                      name="packageTitle"
                      className="input-style"
                      placeholder="Enter Package Title"
                    />
                    {errors.packageTitle && touched.packageTitle ? (
                      <div className="error-color">{errors.packageTitle}</div>
                    ) : null}
                    <FormLabel id="categoryId">Package Category</FormLabel>
                    <Field
                      name="categoryId"
                      select
                      component={TextField}
                      sx={{ width: '93%' }}
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
                    <FormLabel id="packageSlug">Package Slug</FormLabel>
                    <Field
                      type="text"
                      id="packageSlug"
                      name="packageSlug"
                      className="input-style"
                      placeholder="i.e: buy-(quantity)-youtube-(category)"
                    />
                    {errors.packageSlug && touched.packageSlug ? (
                      <div className="error-color">{errors.packageSlug}</div>
                    ) : null}
                    <FormLabel id="quantity">Quantity</FormLabel>
                    <Field
                      type="number"
                      id="quantity"
                      name="quantity"
                      className="input-style"
                      placeholder="Enter Quantity (Number)"
                      min={0}
                      onWheel={(e) => e.target.blur()}
                    />
                    {errors.quantity && touched.quantity ? (
                      <div className="error-color">{errors.quantity}</div>
                    ) : null}
                    <FormLabel id="price">Price</FormLabel>
                    <Field
                      type="number"
                      id="price"
                      name="price"
                      className="input-style"
                      placeholder="Enter Price (Number)"
                      step="any"
                      min={0}
                      onWheel={(e) => e.target.blur()}
                    />
                    {errors.price && touched.price ? (
                      <div className="error-color">{errors.price}</div>
                    ) : null}
                    <FormLabel id="radios">Price Unit</FormLabel>
                    <Field
                      name="priceUnit"
                      select
                      component={TextField}
                      sx={{ width: '93.5%' }}
                      label="Select Value"
                    >
                      <MenuItem value="£" label="£" key="1">
                        £
                      </MenuItem>
                      <MenuItem value="$" label="$" key="2">
                        $
                      </MenuItem>
                    </Field>
                    <FormLabel id="delieveryTime">Package Features</FormLabel>
                    <Typography variant="caption">Features e.g. Delivery Time (One feature per line)</Typography>
                    <RichTextEditor setFieldValue={setFieldValue} name="delieveryTime" />
                    {errors.delieveryTime && touched.delieveryTime ? (
                      <div className="error-color">{errors.delieveryTime}</div>
                    ) : null}
                    <FormLabel id="serviceType">Service Type</FormLabel>
                    <Field
                      name="serviceType"
                      select
                      component={TextField}
                      sx={{ width: '93.5%' }}
                      label="Select Value: Should be same as Category"
                    >
                      <MenuItem value="">Not Selected</MenuItem>
                      {categories?.map((item) => {
                        return (
                          <MenuItem
                            value={item.categorySlug}
                            label={item.categorySlug}
                            key={item._id}
                          >
                            {item.categorySlug}
                          </MenuItem>
                        );
                      })}
                    </Field>
                    <FormLabel id="addons">Addons</FormLabel>
                    <MultipleSelectChip
                      handleChange={(_, value) => {
                        setFieldValue(
                          'addons',
                          typeof value === 'string'
                            ? value.split(',')
                            : value?.map((item) => item._id)
                        );
                      }}
                      id={Math.random()}
                      addons={values.addons}
                      personName={personName}
                      name="addons"
                    />
                    <FormLabel id="pckgDescription">Pacakge Description</FormLabel>
                    <RichTextEditor setFieldValue={setFieldValue} name="pckgDescription" />
                    {/* {errors.pckgDescription && touched.pckgDescription ? (
                      <div className="error-color">{errors.pckgDescription}</div>
                    ) : null} */}
                    <FormLabel id="metaTitle">Meta Title</FormLabel>
                    <Field
                      type="text"
                      id="metaTitle"
                      name="metaTitle"
                      className="input-style"
                      placeholder="Enter Meta Title"
                    />
                    {errors.metaTitle && touched.metaTitle ? (
                      <div className="error-color">{errors.metaTitle}</div>
                    ) : null}
                    <FormLabel id="metaDescription">Meta Description</FormLabel>
                    <RichTextEditor setFieldValue={setFieldValue} name="metaDescription" />
                    {errors.metaDescription && touched.metaDescription ? (
                      <div className="error-color">{errors.metaDescription}</div>
                    ) : null}
                    <FormLabel id="canonicalLink">Canonical Link</FormLabel>
                    <Field
                      type="text"
                      id="canonicalLink"
                      name="canonicalLink"
                      className="input-style"
                      placeholder="Enter Canonical Link"
                    />
                    {errors.canonicalLink && touched.canonicalLink ? (
                      <div className="error-color">{errors.canonicalLink}</div>
                    ) : null}
                    <DataGrid
                      disableSelectionOnClick
                      disableColumnMenu
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      getRowId={(row) => row.durationId}
                      rows={rowsDuration}
                      columns={columns}
                      autoHeight={true}
                    />
                   
                    <Button
                      style={{ width: "230px", marginTop: "16px" }}
                      variant="contained"
                      onClick={() => { setPkgDurationDialogOpen(true)}}
                      startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                      Add Package Duration
                    </Button>
                  </Stack>
                  <Grid container>
                    <Grid xs={12} sm={12} md={12} lg={12} mt={3} item>
                      <FormLabel id="active" sx={{ mt: 1, mb: 1 }}>
                        Active
                      </FormLabel>
                    </Grid>
                    <Grid xs={4} sm={4} md={3} lg={2} item>
                      <Field type="checkbox" id="active" name="active" className="checkbox-style" />
                    </Grid>
                  </Grid>
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
                        to="/dashboard/packages"
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
            <AddPkgDurationDialog
                      open={pkgDurationDialogOpen}
                      setOpen={setPkgDurationDialogOpen}
                      handleDuration={handleDuration}
                    />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
