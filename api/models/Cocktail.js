const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    amount: String
});

const RatingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
});

const CocktailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: String,
    recipe: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false
    },
    ingredients: [IngredientSchema],
    rating: [RatingSchema]
});

CocktailSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});
const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;