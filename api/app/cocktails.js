const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const auth = require("../middleware/auth");

const config = require('../config');
const Cocktail = require("../models/Cocktail");
const User = require("../models/User");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', async(req, res) => {
  try {
    const token = req.get('Authorization');
    let user;

    if (token) user = await User.findOne({token});

    let cocktails;

    if (user && user.role === 'admin') {
      cocktails = await Cocktail.find();
    } else {
      cocktails = await Cocktail.find({isPublished: true});
    }

    res.send(cocktails);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/user', auth, async (req, res) => {
  try {
    const cocktails = await Cocktail.find({user: req.user._id});

    res.send(cocktails);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:id', async(req, res) => {
    try {
        if(req.params.id !== 'undefined'){
            const data = await Cocktail.findById(req.params.id).populate('');
            if(!data) {
                res.status(404).send({message: 'Cocktail info not found!'});
            }
            res.send(data);
        }

    } catch(e) {
        res.sendStatus(500);
    }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const {title, recipe} = req.body;
        const ingredients = JSON.parse(req.body.ingredients);

        const cocktailData = {
            title,
            recipe,
            ingredients,
            image: null,
            user: req.user._id
        };

        if (req.file) {
            cocktailData.image = 'uploads/' + req.file.filename;
        }

        const cocktail = new Cocktail(cocktailData);
        await cocktail.save();

        res.send(cocktail);

    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/rating/:id', auth, async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);

    if (!cocktail) return res.status(404).send({error: 'Cocktail not found!'});

    const userRating = cocktail.rating.findIndex(value => value.user.toString() === req.user._id.toString());

    if (userRating >= 0) {
      cocktail.rating[userRating].rating = req.body.rating;
    } else {
      cocktail.rating.push({
        user: req.user._id,
        rating: req.body.rating
      });
    }

    await cocktail.save();

    res.send('rating successfully set');
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put('/publish/:id', auth, async (req, res) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);

        if (!cocktail) {
            res.status(404).send({message: 'Cocktail not found!'});
        }

        if (req.user.role === 'user') {
            return res.status(401).send({message: 'You don\'t have permissions to this action'});
        }

        const publishedCocktail = await Cocktail
            .findByIdAndUpdate(req.params.id, { isPublished: true }, { new: true });

        res.send(publishedCocktail);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
});


router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);

        if (!cocktail) {
            res.status(404).send({message: 'Cocktail not found!'});
        }

        if (req.user.role === 'user') {
            return res.status(401).send({message: 'You don\'t have permissions to this action'});
        }

        const deletedCocktail = await Cocktail
            .findByIdAndDelete({ _id: req.params.id });

        res.send(deletedCocktail);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
});

module.exports = router;