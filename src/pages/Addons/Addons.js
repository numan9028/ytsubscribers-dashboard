import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Typography, Button, Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { request } from 'src/Redux/helpers/axiosRequest';
// allow only admin user to view addons
import withRole from 'src/components/HOC/withRole';
//
import Loader from 'src/components/Loader';
import Page from 'src/components/Page';
import AddonActions from './components/AddonActions';
import Iconify from 'src/components/Iconify';
// Actions

function Addons(props) {
  // Fetch Data from API
  // Searchable Filters
  const [platform, setPlatform] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const userRole = props.user.userRole;

  // Get All Addons
  React.useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/addon/get-all`,
      method: "GET",
      data: null
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        setPlatform(data?.addons);
        setRows(data?.addons);
        setLoading(false);
      });
    const type = userRole == 1 ? null : navigate('/dashboard/app');
    return () => {
      setPlatform([]); // To Avoid Memory Leak
      setRows([]); // To Avoid Memory Leak
      return type;
    };
  }, []);

  const columns = [
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 130 },
    { field: 'priceUnit', headerName: 'Price Unit', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'discount', headerName: 'Discount', width: 130 },
    {
      field: 'active',
      headerName: 'Status',
      width: 130,
      renderCell: (rowData) => <>{rowData.row.active === true ? 'Active' : 'In-Active'}</>
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      renderCell: (value) => <AddonActions value={value.row.action} id={value.row._id} />
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
    <Page title="Dashboard: Addons">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" gutterBottom>
            Addons
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/addons/create-addon"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Addons
          </Button>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" gutterBottom>
            Addons Data Table
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
        {!loading ? (
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
        ) : (
          <Loader />
        )}
      </Container>
    </Page>
  );
}

export default withRole(Addons);