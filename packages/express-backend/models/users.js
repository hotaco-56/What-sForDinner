import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    bio: {
      type: String,
    }
  },
  {collection: "users"}
);

const User = mongoose.model("User", UserSchema);

export default User;