import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Stack, Typography, Button, Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
// Components
import { request } from 'src/Redux/helpers/axiosRequest';
import Loader from '../../components/Loader';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import ActionButtonPackages from './components/ActionButtonPackages';

export default function Packages() {
  // Fetch Data from API
  // Searchable Filters
  const [platform, setPlatform] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState([]);

  // Get All Packages
  React.useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/package/get-all`,
      method: "GET",
      data: null
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        setPlatform(data?.packages);
        setRows(data?.packages);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      field: 'packageTitle',
      headerName: 'Package Title',
      width: 160
    },
    { field: 'packageSlug', headerName: 'Package Slug', width: 170 },
    { field: 'price', headerName: 'Price', width: 80 },
    { field: 'priceUnit', headerName: 'Price Unit', width: 90 },
    { field: 'quantity', headerName: 'Quantity', width: 90 },
    { field: 'serviceType', headerName: 'Service Type', width: 120 },
    {
      field: 'active',
      headerName: 'Active',
      width: 110,
      renderCell: (value) => <>{value.row.active === true ? 'Active' : 'In-Active'}</>
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      renderCell: (value) => <ActionButtonPackages value={value.row.action} id={value.row._id} />
    }
  ];

  // Searchable Filters
  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  const requestSearch = (searchValue) => {
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = platform.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  return (
    <Page title="Dashboard: Packages">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" gutterBottom>
            All Packages
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/packages/add-package"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Package
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" gutterBottom>
            Packages Table
          </Typography>
          <TextField
            variant="outlined"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              requestSearch(e.target.value);
            }}
            placeholder="Search..."
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" color="action" />,
              endAdornment: (
                <IconButton
                  title="Clear"
                  aria-label="Clear"
                  size="small"
                  style={{
                    visibility: searchText ? 'visible' : 'hidden',
                    borderRadius: '57%',
                    paddingRight: '1px',
                    margin: '0',
                    fontSize: '1.25rem'
                  }}
                  onClick={(e) => {
                    setSearchText('');
                    setRows(platform);
                  }}
                >
                  <ClearIcon fontSize="small" color="action" />
                </IconButton>
              )
            }}
            sx={{
              width: { xs: 1, sm: 'auto' },
              m: (theme) => theme.spacing(1, 0.5, 1.5),
              '& .MuiSvgIcon-root': {
                mr: 0.5
              },
              '& .MuiInput-underline:before': {
                borderBottom: 1,
                borderColor: 'divider'
              }
            }}
          />
        </Stack>
        {loading ? (
          <Loader />
        ) : (
          <Stack sx={{ boxShadow: 3, borderRadius: 1, width: '100%' }}>
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
        )}
      </Container>
    </Page>
  );
}
