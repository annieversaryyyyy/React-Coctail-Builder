import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  deleteCocktailRequest,
  getUserCocktailsRequest,
  publishCocktailRequest
} from "../../store/actions/cocktailsActions";
import {Backdrop, CircularProgress, Grid, Typography} from "@mui/material";
import CocktailItem from "../../components/CocktailItem/CocktailItem";

const ViewMyCocktails = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const cocktails = useSelector(state => state.cocktails.cocktails);
  const loading = useSelector(state => state.cocktails.getCocktailsLoading);

  useEffect(() => {
    dispatch(getUserCocktailsRequest());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={3}>
      {loading ?
        <Backdrop open={loading} color='#fff'>
          <CircularProgress color='inherit'/>
        </Backdrop>
        :
        <>
          {cocktails.length > 0 ?
            <Grid item container spacing={3}>
              {cocktails.map(cocktail => (
                <CocktailItem
                  key={cocktail._id}
                  id={cocktail._id}
                  title={cocktail.title}
                  image={cocktail.image}
                  publish={cocktail.isPublished}
                  userRole={user.role}
                  onDelete={() => dispatch(deleteCocktailRequest(cocktail._id))}
                  onPublish={() => dispatch(publishCocktailRequest(cocktail._id))}
                  view
                />
              ))}
            </Grid>
            :
            <Typography variant='h5' textAlign='center' marginTop='25px'>
              You don't have cocktails
            </Typography>
          }
        </>
      }
    </Grid>
  );
};

export default ViewMyCocktails;