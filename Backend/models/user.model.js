const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const webtoken = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'First name must be at least 3 characters long'],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, 'Last name must be at least 3 characters long'],
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Email must be at least 5 characters long'],
  },

  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false,
  },

  socketId: {
    type: String,
    default: null,
  }
});

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  return webtoken.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' } // Optional expiration
  );
};

// Compare raw password with hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Static method to hash password
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};



const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
