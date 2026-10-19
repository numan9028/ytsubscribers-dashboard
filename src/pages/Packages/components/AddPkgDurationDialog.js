import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { toast } from 'react-toastify';

import * as Yup from 'yup';
// material
import { Stack, Typography, Button, Grid, FormLabel, MenuItem, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { request } from 'src/Redux/helpers/axiosRequest';

export default function AddPakgDurationDialog({ open, setOpen,handleDuration }) {
  
  const [loading, setLoading] = useState(false);
  const [durations, setDurations] = useState([]);
  useEffect(() => {
      request({
        url: `${process.env.REACT_APP_API_URL}/durations/get-all`,
        method: "GET",
        data: null
      })
        .then(({ data }) => {
          setDurations(data.durations);
          setLoading(false);
        });

  }, []);
  const handleClose = () => {
    setOpen(false);
  };



  // Validation Schema for From
  const DurationPkgSchema = Yup.object().shape({
    durationId: Yup.string().required('Duration title is required'),
    priceDuration: Yup.string().required('Price of duration is required'),
  });

  return (
    <Grid container>
  
       <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Package Duration
        </DialogTitle>
        <DialogContent>
            <Formik
              enableReinitialize={true}
              initialValues={{
                durationId: '',
                priceDuration:''
              }}
              validationSchema={DurationPkgSchema}
              onSubmit={async (values) => {
                if (!handleDuration(values)){
                     toast.error('This duration is already added', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined
                  });
                }else{
                  handleClose();

                }
               
              
              }}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form autoComplete="off">
                  <Stack spacing={1} mt={2}>
                  <FormLabel id="durationId">Duration</FormLabel>
                  
                    <Field
                      name="durationId"
                      select
                      component={TextField}
                      sx={{ width: '93.5%' }}
                      label="Select Duration"
                    >
                      <MenuItem value="">Not Selected</MenuItem>
                      {durations?.map((item) => {
                        return (
                          <MenuItem
                            value={`${item._id},${item.duration}`}
                            label={item.duration}
                            key={item._id}
                          >
                            {item.duration}
                          </MenuItem>
                        );
                      })}
                    </Field>

                    <FormLabel id="priceDuration">Price</FormLabel>
                    <Field
                      type="number"
                      id="priceDuration"
                      name="priceDuration"
                      className="input-style"
                      placeholder="Enter Price (Number)"
                      step="any"
                      min={0}
                      onWheel={(e) => e.target.blur()}
                    />
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
                        Add
                      </LoadingButton>
                    </Grid>
                    <Grid xs={4} sm={4} md={3} lg={2} ml={2} mt={3} item>
                      <Button
                        fullWidth
                        color="error"
                        size="large"
                        variant="contained"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
            </DialogContent>
            </Dialog>
    </Grid>
  );
}
