import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  clearCocktailsRequest,
  deleteCocktailRequest,
  getCocktailsRequest,
  publishCocktailRequest
} from "../../store/actions/cocktailsActions";
import {Backdrop, CircularProgress, Grid} from "@mui/material";
import CocktailItem from "../../components/CocktailItem/CocktailItem";

const Cocktails = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const cocktails = useSelector(state => state.cocktails.cocktails);
  const loading = useSelector(state => state.cocktails.getCocktailsLoading);

  useEffect(() => {
    dispatch(getCocktailsRequest());

    return () => {
      dispatch(clearCocktailsRequest());
    };
  }, [dispatch]);

  return cocktails && (
    <Grid container direction="column" spacing={3}>
      {loading ?
        <Backdrop open={loading} color='#fff'>
          <CircularProgress color='inherit'/>
        </Backdrop>
        :
        <Grid item container spacing={3}>
          {cocktails.map(cocktail => (
            <CocktailItem
              key={cocktail._id}
              id={cocktail._id}
              title={cocktail.title}
              image={cocktail.image}
              publish={cocktail.isPublished}
              userRole={user?.role}
              view
              onDelete={() => dispatch(deleteCocktailRequest(cocktail._id))}
              onPublish={() => dispatch(publishCocktailRequest(cocktail._id))}
            />
          ))}
        </Grid>
      }
    </Grid>
  );
};

export default Cocktails;