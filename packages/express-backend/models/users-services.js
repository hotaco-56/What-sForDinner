import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./users.js";
dotenv.config();

let dbConnection;

function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(process.env.MONGODB_URI), {
      UseNewUrlParse: true,
      useUnifiedTopology: true,
    }};
    return dbConnection;
}

async function getUsers(name) {
  console.log(User);
  const usersModel = getDbConnection().model("User", User);
  let promise;
  if (name === undefined) {
    promise = await usersModel.find();
  } else if (name) {
    promise = await findUserByName(name);
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