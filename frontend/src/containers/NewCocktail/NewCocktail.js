import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import {createCocktailRequest} from "../../store/actions/cocktailsActions";
import CocktailForm from "../../components/CocktailForm/CocktailForm";

const NewCocktail = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.cocktails.createCocktailError);

    const onCocktailFormSubmit = cocktailData => {
        dispatch(createCocktailRequest(cocktailData));
    };

    return (
        <>
            <Typography
                textAlign="center"
                marginBottom="30px"
                variant="h4"
            >
                Add new cocktail
            </Typography>
            <CocktailForm
                error={error}
                onSubmit={onCocktailFormSubmit}
            />
        </>
    );
};

export default NewCocktail;