import { Link as RouterLink } from 'react-router-dom';
// material
import { Stack, Button, Container, Typography, Grid } from '@mui/material';
// Section Card
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//
import { createMarkup, decodeEntities } from 'src/Redux/helpers/generalHelper';

export default function HowToBuy(props) {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h6" gutterBottom>
          Section Details
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to={'/dashboard/pages/home/edit-howToBuy-section/' + props.sectionSlug}
        >
          Edit / Add Section
        </Button>
      </Stack>
      <Grid container display="flex" justifyContent="center" alignItems="center">
        {props.loading && 'Loading'}
        {!props.loading &&
          Object.values(props.sectionMeta.steps).length > 0 &&
          props.sectionMeta.steps.map((items) => {
            return (
              <Grid item lg={5} md={5} xs={10} sm={10} mr={1} mb={2}>
                <Card sx={{ boxShadow: 3, borderRadius: '16px' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/static/mock-images/covers/cover_4.jpg"
                    alt="How To Buy Card"
                  />
                  <CardContent height="140">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      dangerouslySetInnerHTML={createMarkup(decodeEntities(items.title))}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      dangerouslySetInnerHTML={createMarkup(decodeEntities(items.shortDescription))}
                    />
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
