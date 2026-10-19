import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material
import { Grid, Container, Stack, Typography, Card, CardContent, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Page from 'src/components/Page';
// Page Section
import PageTopSection from './components/TopSection/PageTopSection';
import OurMission from './components/OurMission/OurMission';
import AboutValues from './components/AboutValues/AboutValues';
// -------------------------------Action-----------------------------------
import { allPageSections } from 'src/Redux/actions/pageSectionActions';
//

export default function AboutPage() {
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
        dispatch(allPageSections('/about'));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  const topSection = pageSections.sections.filter((sec) => sec.sectionSlug === 'about_top_sec');
  const missionSection = pageSections.sections.filter(
    (sec) => sec.sectionSlug === 'about_mission_sec'
  );
  const sixServicesSection = pageSections.sections.filter(
    (sec) => sec.sectionSlug === 'about_six_values'
  );

  return (
    <Page title="Dashboard: Pages | About">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="center" mb={3}>
          <Typography variant="h4" gutterBottom>
            About Page Sections
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
        <Grid
          lg={10}
          md={10}
          xs={10}
          sm={10}
          direction="column"
          alignItems="center"
          justifyContent="center"
          mx="auto"
        >
          <Grid item>
            <Accordion id="hero_section" sx={{ mb: 1, boxShadow: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ p: 1, pl: 2 }}
              >
                <Typography variant="h6">About Top Section</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {topSection.length && <PageTopSection {...topSection[0]} />}
              </AccordionDetails>
            </Accordion>{' '}
          </Grid>
          <Grid item>
            <Accordion sx={{ mb: 1, boxShadow: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                sx={{ p: 1, pl: 2 }}
                id="panel2a-header"
              >
                <Typography variant="h6">About Mission Section</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {missionSection.length && <OurMission {...missionSection[0]} />}
              </AccordionDetails>
            </Accordion>{' '}
          </Grid>
          <Grid item>
            <Accordion sx={{ mb: 1, boxShadow: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                sx={{ p: 1, pl: 2 }}
                id="panel3a-header"
              >
                <Typography variant="h6">About Six Values</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {sixServicesSection.length && <AboutValues {...sixServicesSection[0]} />}
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
