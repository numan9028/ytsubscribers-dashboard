import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material
import { Container, Stack, Typography, Card, CardContent, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// components
import Page from 'src/components/Page';
// Page Section
// -------------------------------Action-----------------------------------
import { allPageSections } from 'src/Redux/actions/pageSectionActions';
//

export default function FaqsPage() {
  const dispatch = useDispatch();
  const pageState = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [pageSections, setPageSection] = useState({
    sections: []
  });
  const formData = pageState.pageSections;

  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState.pageSections]);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        dispatch(allPageSections('/faqs'));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  return (
    <Page title="Dashboard: Pages | Faqs">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="center" mb={3}>
          <Typography variant="h4" gutterBottom>
            Faqs Page
          </Typography>
        </Stack>
        <Card sx={{ maxWidth: '100%', mb: 3 }}>
          <CardContent>
            <Typography variant="body2" gutterBottom>
              <strong>Page Name:</strong> {pageSections.pageName}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Meta Title:</strong> {pageSections.metaTitle}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Meta Description:</strong> {pageSections.metaDescription}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Canonical Link:</strong> {pageSections.canonicalLink}
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to={'/dashboard/pages/edit-page/' + pageSections.id}
              startIcon={<EditIcon />}
            >
              Edit Page
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
