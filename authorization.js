function allowRoles(roles) {
  return function (req, res, next) {
    const isAllowed = roles.includes(req.user.role);
    if (isAllowed) {
      next();
    } else {
      res.status(403).send("Operation is not allowed");
    }
  };
}

module.exports = allowRoles;
