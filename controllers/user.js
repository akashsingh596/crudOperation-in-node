const { model } = require("mongoose");
const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const users = await User.find();
  res.json(users);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { last_name: "Changed" });
  return res.json({ msg: "User updated" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ msg: "User deleted" });
}

async function handleCreateNewUser(req, res) {
  const body = req.body;
  if (
    !body.first_name ||
    !body.email ||
    !body.job_title ||
    !body.last_name ||
    !body.gender
  ) {
    return res.status(400).json({ error: "First name and email are required" });
  }

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    job_title: body.job_title,
    gender: body.gender,
  });
  return res.status(201).json({ msg: "user created", id: result._id });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser
};
