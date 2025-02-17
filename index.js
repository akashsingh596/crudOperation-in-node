const express = require("express");

const mongoose = require("mongoose");

const app = express();

const port = 8000;

// mongoose connection

mongoose
  .connect("mongodb://127.0.0.1:27017/users-creating")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//// schema

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    job_title: { type: String },
    gender: { type: String },
  },
  { timestamps: true }
);

/// model

const User = mongoose.model("User", userSchema);

// middlleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Middleware");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware 2");
  next();
});
/// Routes

/// for ssr

app.get("/users", async (req, res) => {
  const allUsers = await User.find({});
  const html = `<ul>
    ${allUsers
      .map((user) => `<li>${user.first_name} - ${user.email}</li>`)
      .join("")}
    </ul>`;
  return res.send(html);
});

// for api

app.get("/api/users", async (req, res) => {
  const allUsers = await User.find({});
  return res.json(allUsers);
});


app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { last_name: "Changed" });
    return res.json({ msg: "User updated" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ msg: "User deleted" });
  });

app.post("/api/users", async (req, res) => {
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
  return res.status(201).json({ msg: "user created", data: result });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
