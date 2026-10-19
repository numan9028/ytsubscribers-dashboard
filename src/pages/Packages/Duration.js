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
import ActionButtonDurations from './ActionButtonDuration';

export default function Durations() {
  // Fetch Data from API
  // Searchable Filters
  const [platform, setPlatform] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState([]);

  React.useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/durations/get-all`,
      method: "GET",
      data: null
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        setPlatform(data?.durations);
        setRows(data?.durations);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      field: '_id',
      headerName: 'Duration Id',
      width: 400
    },
    { field: 'duration', headerName: 'Duration title', width: 200 },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      renderCell: (value) => <ActionButtonDurations value={value.row.action} id={value.row._id} />
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
    <Page title="Dashboard: Durations">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" gutterBottom>
            All Duration
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/durations/add-duration"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Duration
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" gutterBottom>
            Duration Table
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
