import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import withRole from 'src/components/HOC/withRole';
import { request } from 'src/Redux/helpers/axiosRequest';
import { Stack, Typography, Button, Container } from '@mui/material';
//
import Page from 'src/components/Page';
import RoleActionButton from './components/RoleActionButton';
import Iconify from 'src/components/Iconify';

function UserRoles(props) {
  const navigate = useNavigate();
  const [userRoles, setUserRoles] = React.useState([]);
  // To Check User Role
  const userRole = props.user.userRole;
  const [state, setState] = useState({});

  React.useEffect(() => {
    request({
      url: `${process.env.REACT_APP_API_URL}/users/get-all-roles`,
      method: "GET",
      data: null,
    })
      // .then((res) => res.json())
      .then(({ data }) => setUserRoles(data.userroles));
    // Check User Role
    const type = userRole == 1 ? null : navigate('/dashboard/app');
    return () => {
      setState({}); // To Avoid Memory Leak
      return type;
    };
  }, []);

  const columns = [
    { field: 'roleName', headerName: 'Role Name', width: 240 },
    {
      field: 'status',
      headerName: 'Status',
      width: 240,
      renderCell: (rowData) => <>{rowData.row.status === true ? 'Active' : 'In-Active'}</>
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 260,
      renderCell: (rowData) => moment(rowData.row.createdAt).format('MMMM Do, YYYY - HH:mm a')
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (rowData) => <RoleActionButton id={rowData.row._id} />
    }
  ];

  return (
    <Page title="Dashboard: Users Role">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" gutterBottom>
            User Roles
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/user-role/add-user-role"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Role
          </Button>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" gutterBottom>
            All Roles listing
          </Typography>
        </Stack>
        <Stack sx={{ boxShadow: 3, borderRadius: 1, width: '100%' }}>
          <DataGrid
            rows={userRoles}
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

export default withRole(UserRoles);