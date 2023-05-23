const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Cocktail = require('./models/Cocktail');

const run = async () => {
  await mongoose.connect(config.mongo.db);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const admin = await User.create({
    email: 'admin@gmail.com',
    password: 'admin',
    token: nanoid(),
    role: 'admin',
    displayName: 'Admin'
  });

  await Cocktail.create({
    user: admin._id,
    title: 'Bloody mary',
    ingredients: [{
      title: 'Vodka',
      amount: '45 ml'
    }, {
      title: 'Tomato juice',
      amount: '90 ml'
    }, {
      title: 'Worcestershire Sauce',
      amount: '2 dashes'
    }, {
      title: 'Tabasco sauce'
    }, {
      title: 'Celery salt'
    }, {
      title: 'Black pepper'
    }],
    recipe: 'Stirring gently, pour all ingredients into highball glass. Garnish.',
    isPublished: true,
    image: 'fixtures/blood_mary.jpg'
  }, {
    user: admin._id,
    title: 'Margarita',
    ingredients: [{
      title: 'Tequila ',
      amount: '50 ml'
    }, {
      title: 'Triple sec',
      amount: '20 ml'
    }, {
      title: 'Freshly squeezed lime juice',
      amount: '15 ml'
    }],
    recipe: 'Add all ingredients into a shaker with ice. Shake and strain into a chilled cocktail glass.',
    isPublished: true,
    image: 'fixtures/margarita.jpg'
  }, {
    user: admin._id,
    title: 'Mojito blanco',
    ingredients: [{
      title: 'White rum',
      amount: '45 ml'
    }, {
      title: 'Fresh lime juice',
      amount: '20 ml'
    }, {
      title: 'Mint',
      amount: '6 sprigs'
    }, {
      title: 'White cane sugar',
      amount: '2 teaspoons'
    }, {
      title: 'Soda water'
    }],
    recipe: 'Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Light stir to involve all ingredients. Garnish with sprig of mint leaves and lime slice.',
    isPublished: false,
    image: 'fixtures/mojito_blanco.jpg'
  }, {
    user: admin._id,
    title: 'Apple Martini',
    ingredients: [{
      title: 'Vodka',
      amount: '45 ml'
    }, {
      title: 'Apple schnapps',
      amount: '15 ml'
    }, {
      title: 'Cointreau',
      amount: '15'
    }],
    recipe: 'Mix in a shaker, then pour into a chilled glass.  Garnish and serve.',
    isPublished: false,
    image: 'fixtures/apple_martini.jpg'
  });

  await mongoose.connection.close();
};

run().catch(console.error);