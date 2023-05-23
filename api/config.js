const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  mongo: {
    db: 'mongodb://localhost/cocktailMenu',
    options: {useNewUrlParser: true},
  },
  facebook: {
    appId: '528774525254740',
    appSecret: process.env.FACEBOOK_APP_SECRET,
  },
};