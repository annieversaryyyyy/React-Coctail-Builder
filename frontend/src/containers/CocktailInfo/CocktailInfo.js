import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearCocktailRequest, getIdCocktailRequest, setRateRequest} from "../../store/actions/cocktailsActions";
import {
  Backdrop, Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText, Rating,
  Typography
} from "@mui/material";
import {apiUrl} from "../../config";
import {useParams} from "react-router-dom";
import imageNotAvailable from "../../assets/download.png";

const CocktailInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const cocktail = useSelector(state => state.cocktails.cocktail);
  const loading = useSelector(state => state.cocktails.getCocktailsLoading);
  const user = useSelector(state => state.users.user);

  const [rate, setRate] = useState(null);
  const [readOnly, setReadOnly] = useState(false);

  let cocktailImage = imageNotAvailable;

  if (cocktail?.image) {
    cocktailImage = apiUrl + '/' + cocktail.image;
  }

  useEffect(() => {
    dispatch(getIdCocktailRequest(id));

    return () => {
      dispatch(clearCocktailRequest());
    };
  }, [dispatch, id]);

  useEffect(() => {
    let userRating;

    if (cocktail && user) {
      if (!cocktail.isPublished) {
        setReadOnly(true);
      } else {
        setReadOnly(false);
      }

      userRating = cocktail.rating.find(ratingUser => ratingUser.user === user._id);

      if (userRating) {
        setRate(userRating.rating);
      }
    } else {
      setReadOnly(true);
    }
  }, [cocktail, user]);

  const handleRate = newValue => {
    setRate(newValue);

    dispatch(setRateRequest({
      id: cocktail._id,
      rate: newValue
    }));
  };

  const getAverageRating = () => {
    if (cocktail.rating.length > 0) {
      let sum = 0;

      for (let i = 0; i < cocktail.rating.length; i++) {
        sum += cocktail.rating[i].rating;
      }

      return sum / cocktail.rating.length;
    }

    return 0;
  };

  return (
    <>
      {cocktail &&
        <Card>
          <Grid container component={CardContent}>
            <Grid item>
              <CardMedia
                component='img'
                alt={cocktail.title}
                image={cocktailImage}
                sx={{width: '300px', height: '350px'}}
              />
            </Grid>
            <Grid item paddingX='16px'>
              <Typography variant='h4'>
                {cocktail.title}
              </Typography>
              <Typography variant='h6' marginBottom='10px'>
                Rating: {cocktail && getAverageRating()} ({cocktail.rating.length} votes)
              </Typography>
              <Typography variant='h6'>
                Ingredients:
              </Typography>
              <List>
                {cocktail.ingredients.map(ing => (
                  <ListItem key={ing._id} disablePadding>
                    <ListItemText
                      primary={`╴ ${ing.title} - ${ing.amount}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
          <CardContent>
            <Box marginBottom='10px'>
              <Typography fontWeight='bold'>
                Recipe:
              </Typography>
              <Typography variant='body1'>
                {cocktail.recipe}
              </Typography>
            </Box>
            <Box display='flex' alignItems='center'>
              <Typography fontWeight='bold' marginRight='5px'>
                Rate:
              </Typography>
              <Rating
                name="simple-controlled"
                value={rate}
                onChange={(event, newValue) => handleRate(newValue)}
                readOnly={readOnly}
              />
            </Box>
          </CardContent>
        </Card>
      }
      {loading &&
        <Backdrop open={loading} color='#ff'>
          <CircularProgress color='inherit'/>
        </Backdrop>
      }
    </>
  );
};

export default CocktailInfo;