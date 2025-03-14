const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bio: String,
  email: String,
  phone: String,
  profilePic: String,
  location: String,
  favorites: [{ type: Object }],
  history: [{ type: Object }],
});

UserSchema.index({ name: 1 }, { unique: true });

const Users = model("User", UserSchema);

module.exports = Users;
