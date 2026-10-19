import { useState } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import Label from 'src/components/Label';
//
import { createMarkup, decodeEntities } from 'src/Redux/helpers/generalHelper';

// Function For Image List
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`
  };
}
export default function OurMission(props) {
  // List Images
  const itemData = [
    {
      img: `${process.env.REACT_APP_NODE_ROOT}/uploads/${props.sectionMeta.image_1}`,
      title: `${props.sectionMeta.title} Image 1`,
      cols: 2
    },
    {
      img: `${process.env.REACT_APP_NODE_ROOT}/uploads/${props.sectionMeta.image_2}`,
      title: `${props.sectionMeta.title} Image 2`,
      cols: 2
    },
    {
      img: `${process.env.REACT_APP_NODE_ROOT}/uploads/${props.sectionMeta.image_3}`,
      title: `${props.sectionMeta.title} Image 3`,
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
          to={'/dashboard/pages/about/edit-mission-section/' + props.sectionSlug}
          startIcon={<EditIcon />}
        >
          Edit Section
        </Button>
      </Stack>
      <Grid container>
        <Grid lg={4} md={4} xs={12} sm={12} mr={2}>
          <Label variant="ghost" color={('Mission' === 'banned' && 'error') || 'error'}>
            {sentenceCase(props.sectionMeta.Subtitle ? props.sectionMeta.Subtitle : 'Mission')}
          </Label>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ mt: 1 }}
            dangerouslySetInnerHTML={createMarkup(decodeEntities(props.sectionMeta.title))}
          />
          <Typography variant="body2" color="text.secondary">
            {props.sectionMeta.shortDescription}
          </Typography>
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
            rowHeight={141}
          >
            {itemData.map((item) => (
              <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                <img
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </Container>
  );
}
