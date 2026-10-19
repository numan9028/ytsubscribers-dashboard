import { Link as RouterLink } from 'react-router-dom';
// material
import { Stack, Button, Container, Typography, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { sentenceCase } from 'change-case';
// components
import Label from 'src/components/Label';
import { createMarkup, decodeEntities } from 'src/Redux/helpers/generalHelper';
//

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
          to={'/dashboard/pages/contact/edit-top-section/' + props.sectionSlug}
          startIcon={<EditIcon />}
        >
          Edit Contact Section
        </Button>
      </Stack>
      <Grid container display="flex" justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
        <Grid lg={5} md={5} xs={8} sm={5} mr={1} mb={2} item>
          <Label variant="ghost" color={('Contact' === 'banned' && 'error') || 'error'}>
            {sentenceCase('Contact')}
          </Label>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            dangerouslySetInnerHTML={createMarkup(decodeEntities(props.sectionMeta.title))}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            dangerouslySetInnerHTML={createMarkup(decodeEntities(props.sectionMeta.Subtitle))}
          />
        </Grid>
        <Grid lg={5} md={5} xs={8} sm={5} mr={1} mb={2} item>
          <img
            src={`${process.env.REACT_APP_NODE_ROOT}/uploads/${props.sectionMeta?.image}`}
            alt={props.sectionMeta.title}
            width="100%"
            height="100%"
            loading="lazy"
          />
        </Grid>
      </Grid>
      <Grid container display="flex" justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
        {props.loading && 'Loading'}
        {!props.loading &&
          Object.values(props.sectionMeta.cards).length > 0 &&
          props.sectionMeta.cards.map((items, index) => {
            return (
              <Grid lg={5} md={5} xs={8} sm={5} mr={1} mb={2} key={index} item>
                <div className="contact-card-main">
                  <img
                    src={`${process.env.REACT_APP_NODE_ROOT}/uploads/${items.cardIcon}`}
                    alt={items.cardTitle}
                    className="contact-card-image"
                    loading="lazy"
                  />
                  <Typography
                    className="contact-card-title"
                    gutterBottom
                    variant="h5"
                    component="div"
                    dangerouslySetInnerHTML={createMarkup(decodeEntities(items.cardTitle))}
                  />
                  <Typography
                    className="contact-card-text"
                    variant="body2"
                    color="text.secondary"
                    dangerouslySetInnerHTML={createMarkup(decodeEntities(items.cardText))}
                  />
                </div>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
