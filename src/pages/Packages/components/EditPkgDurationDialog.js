import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';

import * as Yup from 'yup';
// material
import { Stack, Typography, Button, Grid, FormLabel, MenuItem, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//

import { addDuration } from 'src/Redux/actions/durationActions';
import { request } from 'src/Redux/helpers/axiosRequest';
import Iconify from 'src/components/Iconify';

export default function EditPakgDurationDialog({ open, setOpen,handleEditDuration,value }) {
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
        <DialogTitle id="alert-dialog-title">Edit Package Duration
        </DialogTitle>
        <DialogContent>
            <Formik
              enableReinitialize={true}
              initialValues={{
                durationId: `${value.durationId},${value.durationTitle}`,
                priceDuration:value.priceDuration,
                _id:value._id
              }}
              validationSchema={DurationPkgSchema}
              onSubmit={async (values) => {
                handleEditDuration(values);
                handleClose();
              }}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form autoComplete="off">
                  {/* <Typography variant="h6" gutterBottom>
                    Add Package Duration
                  </Typography> */}
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
                        Edit
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
