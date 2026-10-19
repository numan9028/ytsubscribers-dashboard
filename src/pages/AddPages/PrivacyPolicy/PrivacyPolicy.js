import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { request } from 'src/Redux/helpers/axiosRequest';
// Material
import { Container, Stack, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// components
import Page from 'src/components/Page';
import Loader from 'src/components/Loader';

function PrivacyPolicy() {
  const [loading, setLoading] = React.useState(false);

  // Get TOS
  const [termsOfPolicy, setTerms] = React.useState([]);
  React.useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/page/get-by-slug`,
      method: "POST",
      data: { slug: "/terms-of-service" }
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        setTerms(data);
        setLoading(false);
      });
  }, []);

  // Privacy Table
  const columns = [
    { field: 'pageName', headerName: 'Page Name', width: 120 },
    {
      field: 'pageSlug',
      headerName: 'Page Slug',
      width: 130
    },
    {
      field: 'metaTitle',
      headerName: 'Meta Title',
      width: 140
    },
    {
      field: 'metaDescription',
      headerName: 'Meta Description',
      width: 150
    },

    {
      field: 'content',
      headerName: 'Content',
      width: 150
    },
    {
      field: 'canonicalLink',
      headerName: 'Canonical Link',
      width: 130
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: (rowData) => (
        <Button
          fullWidth
          size="medium"
          variant="contained"
          color="primary"
          component={RouterLink}
          to={`/dashboard/pages/terms/edit-term/${rowData.row._id}`}
        >
          Edit
        </Button>
      )
    }
  ];
  return (
    <Page title="Dashboard: Pages | Terms of Services">
      <Container>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Terms of Services
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h6" gutterBottom>
            Data Table for TOS
          </Typography>
        </Stack>
        {loading ? (
          <Loader />
        ) : (
          <Stack sx={{ boxShadow: 3, borderRadius: 1, width: '100%' }}>
            <DataGrid
              rows={[termsOfPolicy]}
              columns={columns}
              getRowId={(row) => [row?._id]}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              checkboxSelection
              autoHeight={true}
            />
          </Stack>
        )}
      </Container>
    </Page>
  );
}

export default PrivacyPolicy;
