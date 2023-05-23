import {createSlice} from "@reduxjs/toolkit";

const name = 'cocktails';

export const initialState = {
    cocktails: [],
    cocktail: null,
    createCocktailError: null,
    createCocktailLoading: false,
    getCocktailsError: null,
    getCocktailsLoading: false,
    deleteCocktailError: null,
    deleteCocktailLoading: false,
    publishCocktailError: null,
    publishCocktailLoading: false,
};

const cocktailsSlice = createSlice({
    name,
    initialState,
    reducers: {
        createCocktailRequest(state) {
            state.createCocktailLoading = true;
            state.createCocktailError = null;
        },
        createCocktailSuccess(state) {
            state.createCocktailLoading = false;
        },
        createCocktailFailure(state, action) {
            state.createCocktailLoading = false;
            state.createCocktailError = action.payload;
        },
        getCocktailsRequest(state) {
            state.getCocktailsLoading = true;
            state.getCocktailsError = null;
        },
        getCocktailsSuccess(state, {payload: cocktails}){
            state.getCocktailsLoading = false;
            state.cocktails = cocktails;
        },
        getCocktailsFailure(state, action) {
            state.getCocktailsLoading = false;
            state.getCocktailsError = action.payload;
        },
        getUserCocktailsRequest(state) {
          state.getCocktailsLoading = true;
          state.getCocktailsError = null;
        },
        getUserCocktailsSuccess(state, {payload: cocktails}){
          state.getCocktailsLoading = false;
          state.cocktails = cocktails;
        },
        getUserCocktailsFailure(state, action) {
          state.getCocktailsLoading = false;
          state.getCocktailsError = action.payload;
        },
        getIdCocktailRequest(state) {
            state.getCocktailsLoading = true;
            state.getCocktailsError = null;
        },
        getIdCocktailSuccess(state, {payload: cocktail}){
            state.getCocktailsLoading = false;
            state.cocktail = cocktail;
        },
        getIdCocktailFailure(state, action){
            state.getCocktailsLoading = false;
            state.getCocktailsError = action.payload;
        },
        setRateRequest(state) {
          state.getCocktailsLoading = true;
          state.getCocktailsError = null;
        },
        setRateSuccess(state) {
          state.getCocktailsLoading = false;
        },
        setRateFailure(state, action) {
          state.getCocktailsLoading = false;
          state.getCocktailsError = action.payload;
        },
        clearCocktailsRequest(state) {
          state.cocktails = [];
        },
        clearCocktailRequest(state) {
          state.cocktail = null;
        },
        deleteCocktailRequest(state) {
            state.deleteCocktailLoading = true;
            state.deleteCocktailError = null;
        },
        deleteCocktailSuccess(state, {payload: deletedCocktail}) {
            state.deleteCocktailLoading = false;
            state.cocktails = state.cocktails.filter(item => item._id !== deletedCocktail._id);
        },
        deleteCocktailFailure(state, action) {
            state.deleteCocktailLoading = false;
            state.deleteCocktailError = action.payload;
        },
        publishCocktailRequest(state) {
            state.publishCocktailLoading = true;
            state.publishCocktailError = null;
        },
        publishCocktailSuccess(state, {payload: publishedCocktail}) {
            state.publishCocktailLoading = false;
            state.cocktails = state.cocktails.map(item => item._id === publishedCocktail._id ? publishedCocktail : item);
        },
        publishCocktailFailure(state, action) {
            state.publishCocktailLoading = false;
            state.publishCocktailError = action.payload;
        },
    }
});

export default cocktailsSlice;