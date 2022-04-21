const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getTodos).post(protect, createTodo);
router.route("/:id").delete(protect, deleteTodo).put(protect, updateTodo);

module.exports = router;
