import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Container, Stack, Typography, Card, CardContent, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Page Section
import PageTopSection from './components/TopSection/PageTopSection';
import PredominantlyUsedServices from './components/PredominantlyUsedServices/PredominantlyUsedServices';
import PowerfulServices from './components/PowerfulServices/PowerfulServices';
import TargetedViews from './components/TargetedViews/TargetedViews';
import HowToBuy from './components/HowToBuy/HowToBuy';
import Page from 'src/components/Page';
import Loader from 'src/components/Loader';
// ----------------------------------------------------------------------
import { allPageSections } from 'src/Redux/actions/pageSectionActions';
import WhyUs from './components/WhyUs/WhyUs';
import ProudlyDelivered from './components/ProudlyDelivered/ProudlyDelivered';

export default function HomePage() {
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
        dispatch(allPageSections('/'));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  const heroSection = pageSections.sections.filter((sec) => sec.sectionSlug === 'hero_section');
  const mainServices = pageSections.sections.filter((sec) => sec.sectionSlug === 'main_services');
  const powerServices = pageSections.sections.filter((sec) => sec.sectionSlug === 'power_services');
  const targetedViews = pageSections.sections.filter((sec) => sec.sectionSlug === 'targeted_views');
  const howToBuy = pageSections.sections.filter((sec) => sec.sectionSlug === 'how_to_buy');
  const proudlyDelivered = pageSections.sections.filter(
    (sec) => sec.sectionSlug === 'numbers_section'
  );
  const whyUs = pageSections.sections.filter((sec) => sec.sectionSlug === 'why_us');

  return (
    <Page title="Dashboard: Pages | Home">
      <Container {...formData}>
        <div className="index__page">
          {loading && <Loader />}
          {!loading && pageSections.sections.length > 0 && (
            <div className="pages_sections_wrapper">
              <Stack direction="row" alignItems="center" justifyContent="center" mb={3}>
                <Typography variant="h4" gutterBottom>
                  Home Page Sections
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
                <Grid item lg={10} md={10} xs={10} sm={10}>
                  <Accordion id="hero_section" sx={{ mb: 1, mt: 1, boxShadow: 2 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{ p: 1, pl: 2 }}
                    >
                      <Typography variant="h6">Top Section</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {heroSection.length && <PageTopSection {...heroSection[0]} />}
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item>
                  <Accordion sx={{ mb: 1, mt: 1, boxShadow: 2 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      sx={{ p: 1, pl: 2 }}
                      id="panel2a-header"
                    >
                      <Typography variant="h6">Predominantly Used Services</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {mainServices.length && <PredominantlyUsedServices {...mainServices[0]} />}
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item>
                  <Accordion sx={{ mb: 1, mt: 1, boxShadow: 2 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      sx={{ p: 1, pl: 2 }}
                      id="panel3a-header"
                    >
                      <Typography variant="h6">Powerful Services</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {powerServices.length && <PowerfulServices {...powerServices[0]} />}
                    </AccordionDetails>
                  </Accordion>{' '}
                </Grid>
                <Grid item>
                  <Accordion sx={{ mb: 1, mt: 1, boxShadow: 2 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      sx={{ p: 1, pl: 2 }}
                      id="panel3a-header"
                    >
                      <Typography variant="h6">YouTube Targeted Views</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {targetedViews.length && <TargetedViews {...targetedViews[0]} />}
                    </AccordionDetails>
                  </Accordion>{' '}
                </Grid>
                <Grid item>
                  <Accordion sx={{ mb: 1, mt: 1, boxShadow: 2 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      sx={{ p: 1, pl: 2 }}
                      id="panel3a-header"
                    >
                      <Typography variant="h6">How to Buy</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {howToBuy.length && <HowToBuy {...howToBuy[0]} />}
                    </AccordionDetails>
                  </Accordion>{' '}
                </Grid>
                <Grid item>
                  <Accordion sx={{ mb: 1, mt: 1, boxShadow: 2 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      sx={{ p: 1, pl: 2 }}
                      id="panel3a-header"
                    >
                      <Typography variant="h6">Proudly Delivered</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {proudlyDelivered.length && <ProudlyDelivered {...proudlyDelivered[0]} />}
                    </AccordionDetails>
                  </Accordion>{' '}
                </Grid>
                <Grid item>
                  <Accordion sx={{ mb: 1, mt: 1, boxShadow: 2 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      sx={{ p: 1, pl: 2 }}
                      id="panel3a-header"
                    >
                      <Typography variant="h6">Why Us</Typography>
                    </AccordionSummary>
                    <AccordionDetails>{whyUs.length && <WhyUs {...whyUs[0]} />}</AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </Container>
    </Page>
  );
}
