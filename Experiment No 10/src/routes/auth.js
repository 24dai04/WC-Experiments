import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { ensureGuest } from "../middleware/auth.js";

const router = express.Router();

router.get("/login", ensureGuest, (req, res) => res.render("auth/login"));
router.get("/register", ensureGuest, (req, res) => res.render("auth/register"));

router.post("/register", ensureGuest, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.render("auth/register", { error: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing) return res.render("auth/register", { error: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    req.session.user = { _id: user._id, name: user.name, email: user.email, city: "Mumbai" }; // default city
    res.redirect("/dashboard");
  } catch (e) {
    res.render("auth/register", { error: "Registration failed" });
  }
});

router.post("/login", ensureGuest, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.render("auth/login", { error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.render("auth/login", { error: "Invalid credentials" });

    req.session.user = { _id: user._id, name: user.name, email: user.email, city: "Mumbai" };
    res.redirect("/dashboard");
  } catch {
    res.render("auth/login", { error: "Login failed" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
});

export default router;
