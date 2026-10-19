import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material
import { Grid, Container, Stack, Typography, Card, CardContent, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// components
import Page from 'src/components/Page';
// Page Section
import PageTopSection from './components/TopSection/PageTopSection';
// -------------------------------Action-----------------------------------
import { allPageSections } from 'src/Redux/actions/pageSectionActions';
import Loader from 'src/components/Loader';
//

export default function ContactPage() {
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
        dispatch(allPageSections('/contact'));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  const topSection = pageSections.sections.filter((sec) => sec.sectionSlug === 'contact_cards');

  return (
    <Page title="Dashboard: Pages | Contact">
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Stack direction="row" alignItems="center" justifyContent="center" mb={3}>
              <Typography variant="h4" gutterBottom>
                Contact Page Sections
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
            <Grid direction="column" alignItems="center" justifyContent="center" mx="auto">
              <Grid lg={10} md={10} xs={10} sm={10} sx={{ p: 1, pl: 2 }} item>
                {topSection.length && <PageTopSection {...topSection[0]} />}
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Page>
  );
}
