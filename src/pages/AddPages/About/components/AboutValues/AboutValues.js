import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Stack,
  Button,
  Container,
  Typography,
  Grid,
  ImageList,
  ImageListItem
} from '@mui/material';
import { sentenceCase } from 'change-case';
// components
import Label from 'src/components/Label';
import EditIcon from '@mui/icons-material/Edit';
import { createMarkup, decodeEntities } from 'src/Redux/helpers/generalHelper';

// Function For Image List
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`
  };
}
export default function AboutValues(props) {
  // List Images
  const itemData = [
    {
      img: `${process.env.REACT_APP_NODE_ROOT}/uploads/${props.sectionMeta?.image}`,
      title: props.sectionMeta.title,
      cols: 4
    }
  ];
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h6" gutterBottom>
          Section Details
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to={'/dashboard/pages/about/edit-values-section/' + props.sectionSlug}
          startIcon={<EditIcon />}
        >
          Edit Section
        </Button>
      </Stack>
      <Grid container>
        <Grid lg={4} md={4} xs={12} sm={12} mr={2}>
          <Label variant="ghost" color={('Values' === 'banned' && 'error') || 'error'}>
            {sentenceCase(props.sectionMeta.Subtitle ? props.sectionMeta.Subtitle : 'Values')}
          </Label>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ mt: 1 }}
            dangerouslySetInnerHTML={createMarkup(decodeEntities(props.sectionMeta.title))}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            dangerouslySetInnerHTML={createMarkup(
              decodeEntities(props.sectionMeta.shortDescription.substring(0, 430) + '...')
            )}
          />
        </Grid>
        <Grid lg={4} md={4} xs={12} sm={12} mr={1}>
          <ImageList
            sx={{
              display: { xs: 'none', lg: 'grid', md: 'grid' },
              width: 500,
              height: 300,
              '& .css-7rtvwf-MuiImageListItem-root .MuiImageListItem-img': {
                objectFit: 'fill !important'
              }
            }}
            variant="quilted"
            cols={5}
            rowHeight={280}
          >
            {itemData.map((item) => (
              <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                <img src={item.img} alt={item.title} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </Container>
  );
}
