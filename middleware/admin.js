<<<<<<< HEAD
// middleware/admin.js
module.exports = (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: 'Unauthorized' });
  
  if (req.user.personType !== 'admin') {
    return res.status(403).json({ msg: 'Admins only' });
  }

  next();
};
=======
const adminOnly = (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: "Unauthorized" });
  if (req.user.role !== "admin") return res.status(403).json({ msg: "Admin only" });
  next();
};

module.exports = adminOnly;
>>>>>>> 6bd4bb9 (initial commit)
