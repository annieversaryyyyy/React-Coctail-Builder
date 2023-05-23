import React from 'react';
import imageNotAvailable from '../../assets/download.png';
import {apiUrl} from "../../config";
import {Box, Button, Card, CardActions, CardHeader, CardMedia, Grid, IconButton} from "@mui/material";
import {Link} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';

const CocktailItem = ({id, title, image, publish, view, userRole, onPublish, onDelete}) => {
  let cocktailImage = imageNotAvailable;

  if (image) {
    cocktailImage = apiUrl + '/' + image;
  }

  return (
    <Grid item xs={12} sm={4} lg={3}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
      }}>
        <CardMedia
          component='img'
          title={title}
          image={cocktailImage}
          sx={{height: '250px'}}
        />
        <CardHeader title={title} subheader={
          (view && !publish) && '(unpublished)'
        }/>
        <CardActions
          sx={{marginTop: 'auto'}}
        >
          <Button
            variant="text"
            component={Link}
            to={`/cocktails/${id}`}
          >
            More Info
          </Button>
            {userRole === 'admin' ? (
                <Box marginLeft='auto'>
                  {!publish &&
                    <IconButton onClick={onPublish}>
                      <PublishIcon/>
                    </IconButton>}
                  <IconButton onClick={onDelete}>
                    <DeleteIcon/>
                  </IconButton>
                </Box>
            ) : null}
        </CardActions>
      </Card>
    </Grid>

  );
};

export default CocktailItem;