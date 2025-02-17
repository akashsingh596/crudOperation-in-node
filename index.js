const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();

const port = 8000;

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

// app.get("/users", (req, res) => {
//   const html = `<ul>
//     ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
//     </ul>`;
//   return res.send(html);
// });

app.get("/api/users", (req, res) => {
  return res.json(users);
});

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    console.log(id);
    const body = req.body;
    console.log(body);
    const userIndex = users.findIndex((user) => user.id === id);
    console.log("userIndex", userIndex);
    users[userIndex] = { ...users[userIndex], ...body };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "User patch", id: users });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    users.splice(userIndex, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "User deleted", id: users });
    });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "User added", id: users });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
