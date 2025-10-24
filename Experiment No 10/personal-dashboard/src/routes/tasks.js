import express from "express";
import { ensureAuth } from "../middleware/auth.js";
import Task from "../models/Task.js";

const router = express.Router();

router.post("/", ensureAuth, async (req, res) => {
  const { title } = req.body;
  if (title?.trim()) {
    await Task.create({ user: req.session.user._id, title: title.trim() });
  }
  res.redirect("/dashboard");
});

router.post("/:id/toggle", ensureAuth, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.session.user._id });
  if (task) {
    task.done = !task.done;
    await task.save();
  }
  res.redirect("/dashboard");
});

router.post("/:id/delete", ensureAuth, async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, user: req.session.user._id });
  res.redirect("/dashboard");
});

export default router;
