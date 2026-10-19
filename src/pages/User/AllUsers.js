import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Typography, Button, Container } from '@mui/material';
import moment from 'moment';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import UserActionButton from './components/UserActionButton';
import withRole from 'src/components/HOC/withRole';
import { request } from 'src/Redux/helpers/axiosRequest';

function AllUsers(props) {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState([]);
  // For User Role
  const userRole = props.user.userRole;
  const [state, setState] = useState({});

  // Get All Users
  React.useEffect(() => {
    request({
      url: `${process.env.REACT_APP_API_URL}/users/get-all`,
      method: "GET",
      data: null
    })
      // .then((res) => res.json())
      .then(({ data }) => setUsers(data.users));

    // Check User Role
    const type = userRole == 1 ? null : navigate('/dashboard/app');
    return () => {
      setState({}); // To Avoid Memory Leak
      return type;
    };
  }, []);

  const columns = [
    // { field: 'id', headerName: 'ID', width: 70, renderCell: (rowData) => rowData + 1 },
    {
      field: 'name',
      headerName: 'Name',
      width: 180,
      renderCell: (rowData) => <p style={{ textTransform: 'capitalize' }}>{rowData.row.name}</p>
    },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'userRole',
      headerName: 'User Role',
      width: 150,
      renderCell: (rowData) => (
        <>{rowData.row.userRole == '1' ? 'Admin' : rowData.row.userRole == '2' ? 'SEO' : 'User'}</>
      )
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      renderCell: (rowData) => moment(rowData.row.createdAt).format('MMMM Do, YYYY')
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 160,
      renderCell: (rowData) => <UserActionButton id={rowData.row._id} />
    }
  ];

  return (
    <Page title="Dashboard: Users">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" gutterBottom>
            All Users
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/users/create-user"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add User
          </Button>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" gutterBottom>
            Data Table of Users
          </Typography>
        </Stack>
        <Stack sx={{ boxShadow: 3, borderRadius: 1, width: '100%' }}>
          <DataGrid
            rows={users}
            getRowId={(row) => row._id}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            checkboxSelection
            autoHeight={true}
          />
        </Stack>
      </Container>
    </Page>
  );
}

export default withRole(AllUsers)