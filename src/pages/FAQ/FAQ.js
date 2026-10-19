import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
// material
import { Container, Stack, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
// components
import { request } from 'src/Redux/helpers/axiosRequest';
import Page from 'src/components/Page';
import Loader from 'src/components/Loader';
import Iconify from 'src/components/Iconify';
import ActionButtonFaq from './components/ActionButtonFaq';

export default function FAQ() {
  // Fetch Data from API
  // Searchable Filters
  const [platform, setPlatform] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState([]);

  // Get All Faqs
  useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/faq/get-all`,
      method: "GET",
      data: null
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        setPlatform(data?.faqs);
        setRows(data?.faqs);
        console.log(data);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 160
    },
    { field: 'description', headerName: 'Description', width: 170 },
    {
      field: 'category',
      headerName: 'Category',
      width: 170,
      renderCell: (params) => (
        <> {params.row?.category ? params.row?.category?.categoryName : 'No Category'}</>
      )
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 140,
      renderCell: (value) => <>{moment(value.row.createdAt).format('DD-MMM-YYYY')}</>
    },
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
      renderCell: (value) => <ActionButtonFaq value={value.row.action} id={value.row._id} />
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
    <Page title="Dashboard: Pages | FAQs">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            FAQs Page
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/dashboard/pages/faqs/add-faq"
            startIcon={<Iconify icon="eva:plus-fill" />}
            sx={{ marginRight: '10px' }}
          >
            ADD NEW FAQ
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
              pageSize={20}
              rowsPerPageOptions={[20]}
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
