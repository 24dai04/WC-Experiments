export const ensureAuth = (req, res, next) => {
  if (req.session.user) return next();
  return res.redirect("/login");
};

export const ensureGuest = (req, res, next) => {
  if (req.session.user) return res.redirect("/dashboard");
  return next();
};
