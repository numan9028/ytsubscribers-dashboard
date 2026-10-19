import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Typography, Button, Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
//
import { request } from 'src/Redux/helpers/axiosRequest';
import Loader from 'src/components/Loader';
import Page from 'src/components/Page';
import ActionButton from './components/ActionButton';
import Iconify from 'src/components/Iconify';

export default function PackageCategories() {
  // Fetch Data from API
  // Searchable Filters
  const [platform, setPlatform] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState([]);

  //Get All Categories
  React.useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/category/get-all`,
      method: "GET",
      data: null,
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        setPlatform(data?.categories);
        setRows(data?.categories);
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: 'categoryName', headerName: 'Category Name', width: 140 },
    { field: 'categorySlug', headerName: 'Category Slug', width: 140 },
    { field: 'metaTitle', headerName: 'Meta Title', width: 120 },
    { field: 'metaDescription', headerName: 'Meta Description', width: 140 },
    { field: 'canonicalLink', headerName: 'Canonical Link', width: 140 },
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
      renderCell: (value) => <ActionButton value={value.row.action} id={value.row._id} />
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
    <Page title="Dashboard: Packages Categories">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" gutterBottom>
            All Package Categories
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/package-category/add-category"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Category
          </Button>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" gutterBottom>
            Categories Table
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
