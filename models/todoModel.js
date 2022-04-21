const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  todos: {
    content: String,
    isCompleted: Boolean,
    createdAt: String,
    priority: String,
  },
});
module.exports = mongoose.model("Todos", todosSchema);
