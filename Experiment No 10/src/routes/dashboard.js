import express from "express";
import { ensureAuth } from "../middleware/auth.js";
import Task from "../models/Task.js";
import Note from "../models/Note.js";
import { getDailyQuote, getWeatherByCity } from "../services/external.js";

const router = express.Router();

router.get("/", (req, res) => res.redirect("/dashboard"));

router.get("/dashboard", ensureAuth, async (req, res) => {
  const userId = req.session.user._id;
  const [tasks, notes, quote, weather] = await Promise.all([
    Task.find({ user: userId }).sort({ createdAt: -1 }).lean(),
    Note.find({ user: userId }).sort({ updatedAt: -1 }).lean(),
    getDailyQuote(),
    getWeatherByCity(req.session.user.city || "Mumbai")
  ]);

  res.render("dashboard", {
    user: req.session.user,
    tasks,
    notes,
    quote,
    weather
  });
});

router.post("/profile/city", ensureAuth, async (req, res) => {
  const { city } = req.body;
  req.session.user.city = city || "Mumbai";
  res.redirect("/dashboard");
});

export default router;
