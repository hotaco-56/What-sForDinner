import mongoose from "mongoose";
import userModel from "./users.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users")
  .catch((error) => console.log(error));

function getUsers(name) {
  let promise;
  if (name === undefined) {
    promise = userModel.find();
  } else if (name) {
    promise = findUserByName(name);
  } 
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
};