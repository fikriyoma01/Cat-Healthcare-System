const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true }, // admin, store_owner, cat_owner
});

module.exports = mongoose.model('User', UserSchema);
