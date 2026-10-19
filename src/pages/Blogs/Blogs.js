import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { request } from 'src/Redux/helpers/axiosRequest';
// material
import { Container, Stack, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
// components
import Page from 'src/components/Page';
import Loader from 'src/components/Loader';
import Iconify from 'src/components/Iconify';
// ---------------------------- Action --------------------------------
import ActionButtonBlogs from './components/ActionButtonBlogs';
//

const Blogs = () => {
  // Fetch Data from API
  // Searchable Filters
  const [platform, setPlatform] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = useState([]);

  // Get All Packages
  useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/blogs/get-all`,
      method: "GET",
      data: null
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        setPlatform(data?.posts);
        setRows(data?.posts);
        setLoading(false);
      });
  }, []);

  // Columns for Categories
  const columns = [
    {
      field: 'postImg',
      headerName: 'Image',
      width: 80,
      renderCell: (rowData) => (
        <img
          src={`${process.env.REACT_APP_NODE_ROOT}/uploads/blog_images/${rowData.row.postThumbnail}`}
          alt={rowData.row.postThumbnail}
          width="80%"
        />
      )
    },
    { field: 'title', headerName: 'Title', width: 120 },
    { field: 'slug', headerName: 'Slug', width: 120 },
    {
      field: 'metaDescription',
      headerName: 'Meta Description',
      width: 130
    },
    {
      field: 'postThumbnail',
      headerName: 'Post Thumbnail',
      width: 130
    },
    {
      field: 'active',
      headerName: 'Active',
      width: 80,
      renderCell: (rowData) => <>{rowData.row.active == true ? 'Active' : 'In-Active'}</>
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 130,
      renderCell: (rowData) => new Date(rowData.row.createdAt).toDateString()
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 140,
      renderCell: (value) => (
        <ActionButtonBlogs value={value.row.action} slug={value.row.slug} id={value.row._id} name="blogs" />
      )
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
        return searchRegex.test(row[field]);
      });
    });
    setRows(filteredRows);
  };

  return (
    <Page title="Dashboard: Pages | Blogs">
      <Container>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Blogs Page
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/dashboard/blogs/add-blog"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            ADD NEW BLOG
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" gutterBottom>
            Blogs Data Table
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
              pageSize={20}
              rowsPerPageOptions={[20]}
              getRowId={(row) => row._id}
              rows={rows}
              columns={columns}
              autoHeight={true}
              disableSelectionOnClick
              disableColumnMenu
              checkboxSelection
            />
          </Stack>
        )}
      </Container>
    </Page>
  );
};
export default Blogs;
