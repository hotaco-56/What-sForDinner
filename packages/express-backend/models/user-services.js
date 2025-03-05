import users from "./user.js";

const findUserById = (id) => {
  return users["users_list"].find((user) => user["id"] === id);
};

export default {
  findUserById,
};
