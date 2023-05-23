const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const validateEmail = value => {
  const pattern = /^([a-zA-Z0-9]+[_.]?[a-zA-Z0-9])+@([a-zA-Z]{2,5})\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

  if (!pattern.test(value)) return false;
};

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {validator: validateEmail, message: 'Email is not valid!'}
    ]
  },
  password: {
    type: String,
    required: true,
  },
  facebookId: String,
  displayName: {
    type: String,
    required: true,
  },
  avatar: String,
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin'],
  },
  token: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
  this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;