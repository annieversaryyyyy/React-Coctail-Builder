import React, {useState} from 'react';
import {Button, Grid, IconButton, Typography} from "@mui/material";
import FileInput from "../UI/Form/FileInput/FileInput";
import FormElement from "../UI/Form/FormElement/FormElement";
import ClearIcon from '@mui/icons-material/Clear';

const CocktailForm = ({onSubmit, error}) => {
    const [state, setState] = useState({
        title: '',
        recipe: ''
    });
    const [ingredients, setIngredients] = useState([
        {title: '', amount: ''},
    ]);

    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', state.title);
        formData.append('recipe', state.recipe);
        formData.append('image', state.image);
        formData.append('ingredients', JSON.stringify(ingredients));

        onSubmit(formData);
    };

    const addIngredients = () => {
        setIngredients(prev => [
            ...prev,
            {title: '', amount: ''},
        ]);
    };

    const deleteIngredient = index => {
        setIngredients([
          ...ingredients.slice(0, index),
          ...ingredients.slice(index + 1)
        ]);
    };

    const ingChangeHandler = (e, index) => {
        const {name, value} = e.target;

        setIngredients(prev => {
            const ingCopy = {
                ...prev[index],
                [name]: value,
            };

            return prev.map((ing, i) => {
                if (index === i) {
                    return ingCopy;
                }
                return ing;
            });
        });
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setState(prevState => ({...prevState, [name]: file}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid
                container
                maxWidth="md"
                textAlign="center"
                marginX="auto"
                direction="column"
                rowSpacing={2}
            >

                <FormElement
                    required
                    label="Name"
                    onChange={inputChangeHandler}
                    value={state.title}
                    name="title"
                    error={getFieldError('title')}
                />

                <Typography
                    textAlign="center"
                    marginTop="20px"
                    variant="h5"
                >
                    Ingredients
                </Typography>
                {ingredients.map((ing, index) => (
                    <Grid key={index} container spacing={2} alignItems='center'>
                        <Grid item xs={8} mt={2}>
                            <FormElement
                                required
                                label="Ingredient name"
                                onChange={e => ingChangeHandler(e, index)}
                                value={ing.title}
                                name="title"
                                error={getFieldError('title')}
                            />
                        </Grid>
                        <Grid item xs={3} mt={2}>
                            <FormElement
                                label="Amount"
                                onChange={e => ingChangeHandler(e, index)}
                                value={ing.amount}
                                name="amount"
                                error={getFieldError('amount')}
                            />
                        </Grid>
                      {index !== 0 &&
                        <Grid item xs mt={2}>
                          <IconButton onClick={() => deleteIngredient(index)}>
                            <ClearIcon/>
                          </IconButton>
                        </Grid>}
                    </Grid>
                ))}
                <Grid item>
                    <Button type="button" onClick={addIngredients} variant="contained">Add ingredients</Button>
                </Grid>

                <FormElement
                    required
                    label="Recipe"
                    onChange={inputChangeHandler}
                    value={state.recipe}
                    name="recipe"
                    error={getFieldError('recipe')}
                    multiline
                    rows={4}
                />

                <Grid item>
                    <FileInput
                        label="Image"
                        name="image"
                        onChange={fileChangeHandler}
                    />
                </Grid>

                <Grid item>
                    <Button type="submit" color="primary" variant="contained">Create cocktail</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CocktailForm;