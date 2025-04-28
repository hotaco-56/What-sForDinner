import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  displayName: String,
  passwd: String,
  bio: String,
  email: String,
  phone: String,
  profilePic: String,
  location: String,
  favorites: [{ type: String }],
  history: [{ type: Object }],
});

UserSchema.index({ name: 1 }, { unique: true });

const Users = mongoose.model("User", UserSchema);

export default Users;