import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Typography, Button, Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
//
import Loader from 'src/components/Loader';
import Page from 'src/components/Page';
import Iconify from 'src/components/Iconify';
import { request } from 'src/Redux/helpers/axiosRequest';
// Actions
import ActionButton from './components/ActionButton';

export default function WhyUs() {
  // Fetch Data from API
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = useState([]);

  // Get All Addons
  React.useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/section/get-all-sections`,
      method: "GET",
      data: null
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        // console.log('data//', data.sections);
        setRows(data.sections);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      field: 'sectionName',
      headerName: 'Section Name',
      width: 150
    },
    {
      field: 'categoryId',
      headerName: 'Category',
      width: 150,
      renderCell: (params) => (
        <> {params.row?.categoryId ? params.row?.categoryId?.categoryName : 'No Category'}</>
      )
    },
    {
      field: 'whyus_cols',
      headerName: 'Title',
      width: 150,
      renderCell: (params) => (
        <>
          {params.row.sectionMeta?.whyus_cols?.map((item) => {
            return <>{item.title}, </>;
          })}
        </>
      )
    },
    {
      field: 'whyus_cols.title',
      headerName: 'Description',
      width: 130,
      renderCell: (params) => (
        <>
          {params.row.sectionMeta?.whyus_cols?.map((item) => {
            return <>{item.shortDescription}, </>;
          })}
        </>
      )
    },
    {
      field: 'whyus_cols.position',
      headerName: 'Position',
      width: 120,
      renderCell: (params) => (
        <>
          {params.row.sectionMeta?.whyus_cols?.map((item) => {
            return <>{item.position}, </>;
          })}
        </>
      )
    },
    {
      field: 'active',
      headerName: 'Active',
      width: 100,
      renderCell: (value) => <>{value.row.active === true ? 'Active' : 'In-Active'}</>
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      renderCell: (value) => <ActionButton value={value.row.action} id={value.row._id} />
    }
  ];

  return (
    <Page title="Dashboard: Addons">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" gutterBottom>
            Why Us
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/why-us/add-why-us"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Section
          </Button>
        </Stack>

        {!loading ? (
          <Stack
            sx={{
              boxShadow: 3,
              borderRadius: 1,
              width: '100%'
            }}
          >
            <Typography variant="h6" gutterBottom pl={2} pt={2}>
              Why Us Data Table
            </Typography>
            <DataGrid
              disableSelectionOnClick
              disableColumnMenu
              checkboxSelection
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row._id}
              rows={rows}
              columns={columns}
              autoHeight={true}
            />
          </Stack>
        ) : (
          <Loader />
        )}
      </Container>
    </Page>
  );
}
