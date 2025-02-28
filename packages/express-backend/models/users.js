import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
    }
  },
  { collection: "users" }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;