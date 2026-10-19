import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';
// material
import { Stack, Typography, Button, Grid, FormLabel, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddPkgDurationDialog from './AddPkgDurationDialog';

//
import { request } from 'src/Redux/helpers/axiosRequest';
import RichTextEditor from 'src/components/RichTextEditor';
import MultipleSelectChip from './MultipleSelectChip';
// import Loader from 'src/components/Loader';
//
import { singlePackage, updatePackage } from 'src/Redux/actions/packageActions';
import Iconify from 'src/components/Iconify';
import { DataGrid } from '@mui/x-data-grid';
import ActionButtonDurations from '../ActionButtonDuration';
import ActionButtonPkgDurations from '../ActionButtonPkgDuration';
import { isDate, split } from 'lodash';

export default function EditPackage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [pkgDuration, setPkgDuration] = useState([]);
  const [pkgDurationDialogOpen, setPkgDurationDialogOpen] = useState(false);
  const handleDuration = (values) => {
    const [durationId, durationTitle]=split(values.durationId,',');
    let isDuplicate;
    setPkgDuration(prevPkgDuration => {
      isDuplicate = prevPkgDuration.some(pkg => pkg.durationId == durationId);
      if (isDuplicate) {
        console.error('is duplicate of edit',isDuplicate)
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
  const handleEditDuration = (values) => {
    let obj = split(values.durationId, ',');
    let updatedDurationObj = {
      _id: values._id, 
      durationId: obj[0],
      durationTitle: obj[1],
      priceDuration: values.priceDuration,
    };
  
    setPkgDuration(prevPkgDuration => {
      return prevPkgDuration.map(pkg => {
        if (pkg._id === values._id){
          return updatedDurationObj
        } else{
          return pkg
        }
       
      });
    });
  };
  const handleDeleteDuration = (itemId) => {
    setPkgDuration(prevPkgDuration => prevPkgDuration.filter(item => item._id !== itemId));

  };

  const [personName, setPersonName] = useState([]);
  // Get All Packages
  const pageState = useSelector((state) => state.packages.items);
  const [pageSections, setPageSection] = useState({
    data: []
  });
  const updatePkgDurationState=(durationDetails)=>{
    const pkgDur = durationDetails.map(item => ({
      _id:item._id,
      durationId: item.durationId,
      durationTitle: item.durationTitle,
      priceDuration: item.priceDuration
    }));
    setPkgDuration(pkgDur);
  }
  const formData = pageState;
  const rowsDuration=pkgDuration;
  useEffect(() => {
    const durationDetails = pageState.pkgDurationDetail;
    if (durationDetails){
      updatePkgDurationState(durationDetails);
    }
  }, [pageState.pkgDurationDetail]); 
  useEffect(()=>{
  },[pkgDuration])
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

  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState.faqs]);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        dispatch(singlePackage(id));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
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
      renderCell: (params) => {
        return (
          <ActionButtonPkgDurations  
            value={params.row}
            handleDeleteDuration={handleDeleteDuration}
            handleEditDuration={handleEditDuration}

          />
        );
      }
    }
  ];

  // Validation Schema for From
  const PackageSchema = Yup.object().shape({
    packageTitle: Yup.string().required('Package Title is required'),
    packageSlug: Yup.string().required('Package Slug is required'),
    quantity: Yup.string().required('Quantity is required'),
    price: Yup.string().required('Price is required'),
    categoryId: Yup.string().required('Package Category is required'),
    priceUnit: Yup.string().required('Price Unit is required'),
    delieveryTime: Yup.string().required('Delievery Time is required'),
    serviceType: Yup.string().required('Service Type is required'),
    // serviceId: Yup.string().required('Service Id is required'),
    // pckgDescription: Yup.string().required('Package Description is required')
  });

  return (
    <Grid container>
      <Grid item lg={10} md={10} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={{
                id: id,
                packageTitle: pageState.packageTitle ? pageState.packageTitle : '',
                categoryId: pageState.categoryId ? pageState.categoryId._id : '',
                packageSlug: pageState.packageSlug ? pageState.packageSlug : '',
                quantity: pageState.quantity ? pageState.quantity : '',
                price: pageState.price ? pageState.price : '',
                priceUnit: pageState.priceUnit ? pageState.priceUnit : '',
                delieveryTime: pageState.delieveryTime ? pageState.delieveryTime : '',
                serviceType: pageState.serviceType ? pageState.serviceType : '',
                //serviceId: pageState.serviceId ? pageState.serviceId : '',
                active: pageState.active ? pageState.active : true,
                pckgDescription: pageState.pckgDescription ? pageState.pckgDescription : '',
                metaTitle: pageState.metaTitle ? pageState.metaTitle : '',
                metaDescription: pageState.metaDescription ? pageState.metaDescription : '',
                canonicalLink: pageState.canonicalLink ? pageState.canonicalLink : '',
                addons: pageState.addons ? pageState.addons : []
              }}
              // validationSchema={PackageSchema}
              onSubmit={async (values) => {
                values.packageDuration=pkgDuration;
                dispatch(updatePackage(values, navigate));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 3000);
              }}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Edit Package
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
                      sx={{ width: '93.5%' }}
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
                      placeholder="Enter Package Slug"
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
                      step="any"
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
                    <RichTextEditor setFieldValue={setFieldValue} name="delieveryTime" value={values.delieveryTime} />
                    {/* {errors.delieveryTime && touched.delieveryTime ? (
                      <div className="error-color">{errors.delieveryTime}</div>
                    ) : null} */}
                    <FormLabel id="serviceType">Service Type</FormLabel>
                    <Field
                      name="serviceType"
                      select
                      component={TextField}
                      sx={{ width: '93.5%' }}
                      label="Select Value"
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
                      addons={values.addons}
                      personName={personName}
                      name="addons"
                    />
                    <FormLabel id="pckgDescription">Pacakge Description</FormLabel>
                    <RichTextEditor
                      setFieldValue={setFieldValue}
                      name="pckgDescription"
                      value={values.pckgDescription}
                    />
                    {errors.pckgDescription && touched.pckgDescription ? (
                      <div className="error-color">{errors.pckgDescription}</div>
                    ) : null}
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
                    <FormLabel id="metaDescription">Meta Description</FormLabel>{' '}
                    <RichTextEditor
                      setFieldValue={setFieldValue}
                      name="metaDescription"
                      value={values.metaDescription}
                    />
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
                    <Grid item xs={4} sm={4} md={3} lg={2} ml={2} mt={3}>
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
