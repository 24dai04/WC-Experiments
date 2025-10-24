import express from "express";
import { ensureAuth } from "../middleware/auth.js";
import Note from "../models/Note.js";

const router = express.Router();

router.post("/", ensureAuth, async (req, res) => {
  const { title, body } = req.body;
  await Note.create({ user: req.session.user._id, title: title || "Untitled", body: body || "" });
  res.redirect("/dashboard");
});

router.post("/:id/update", ensureAuth, async (req, res) => {
  const { title, body } = req.body;
  await Note.updateOne(
    { _id: req.params.id, user: req.session.user._id },
    { $set: { title, body } }
  );
  res.redirect("/dashboard");
});

router.post("/:id/delete", ensureAuth, async (req, res) => {
  await Note.deleteOne({ _id: req.params.id, user: req.session.user._id });
  res.redirect("/dashboard");
});

export default router;
