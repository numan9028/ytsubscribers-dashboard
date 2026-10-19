import { Link as RouterLink } from 'react-router-dom';
// material
import { Stack, Button, Container, Typography, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// Section Card
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//
import { createMarkup, decodeEntities } from 'src/Redux/helpers/generalHelper';

export default function PageTopSection(props) {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h6" gutterBottom>
          Section Details
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to={'/dashboard/pages/home/edit-top-section/' + props.sectionSlug}
          startIcon={<EditIcon />}
        >
          Edit Section
        </Button>
      </Stack>
      <Grid container>
        <Grid item lg={4} md={4} xs={10} sm={10} mr={1}>
          <Card sx={{ boxShadow: 3, borderRadius: '16px' }}>
            <CardMedia
              component="img"
              height="140"
              image={`${process.env.REACT_APP_NODE_ROOT}/uploads/${props.sectionMeta?.image}`}
              alt="Page Hero Section"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                dangerouslySetInnerHTML={createMarkup(decodeEntities(props.sectionMeta.title))}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                dangerouslySetInnerHTML={createMarkup(decodeEntities(props.sectionMeta.Subtitle))}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
