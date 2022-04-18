const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  "mongodb+srv://dbAdmin:Vini1234@todoapp.dhrbo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const todosSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const Todos = mongoose.model("Todos", todosSchema);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (user) {
    res.status(500).send("User already exists");
    return;
  }
  await User.create({ username, password });
  res.json({
    message: "User created successfully",
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user.password != password) {
    res.status(403);
    res.json({ message: "Invalid login" });
    return;
  }
  res.json({
      message: "Logged successfully",
    });
});

app.post("/todos", async (req, res) => {
    const { authorization } = req.headers;
    const [, token] = authorization.split(" ");
    const [username, password] = token.split(":");
    const user = await User.findOne({ username }).exec();
    if (!user || user.password != password) {
      res.status(403);
      res.json({ message: "Invalid login" });
      return;
    }
    // const todos = await
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
  app.listen(port, () => console.log(`Listening on port ${port}`));
});
