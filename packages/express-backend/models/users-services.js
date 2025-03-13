import mongoose from "mongoose";
import dotenv from "dotenv";
import Users from "./users.js";
import connectDB from "../database.js";

await connectDB();

async function getUsers(name) {
  let user;
  try {
    user = await Users.find();
    console.log("users found:", user);
  } catch (err) {
    console.error("query error:", err);
  }
  return user;
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