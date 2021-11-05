const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username cannot be empty'],
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty'],
  },
});

// mongoose pre middleware to replace the password with hashed password before storing to DB
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  // just proceeding the express flow with next() one this.password is replaced with hashed password
  next();
});

// custom schema method to authenticate user based on username and password passed
userSchema.statics.authenticateLogin = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    return (await bcrypt.compare(password, user.password)) ? user : false;
  }
  return false;
};

module.exports = mongoose.model('User', userSchema);
