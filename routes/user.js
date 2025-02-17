const express = require("express");

const router = express.Router();

const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

/// for ssr

// router.get("/users", async (req, res) => {
//   const allUsers = await User.find({});
//   const html = `<ul>
//     ${allUsers
//       .map((user) => `<li>${user.first_name} - ${user.email}</li>`)
//       .join("")}
//     </ul>`;
//   return res.send(html);
// });

// for api

router
  .route("/")
  .get(handleGetAllUsers)
  .post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
