const jwt = require("jsonwebtoken");
const authToken = (previliges) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return res.status(401).json({ success: false, msg: "no token" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(401);
      console.log(user);
      if (!previliges) {
        req.user = {
          _id: user._id,
          username: user.username,
          slug: user.slug,
          email: user.email,
          isCompany: user.isCompany,
          profileCompleted: user.profileCompleted,
          isAdmin: user.isAdmin,
          roles: user.roles,
          token,
        };
        return next();
      }
      if (user.roles) {
        for (i = 0; i < user.roles.length; i++) {
          if (previliges.includes(user.roles[i])) {
            req.user = {
              _id: user._id,
              slug: user.slug,
              username: user.username,
              email: user.email,
              profileCompleted: user.profileCompleted,

              isCompany: user.isCompany,
              isAdmin: user.isAdmin,
              token,
            };

            return next();
          }
        }
      }

      return res.status(401).json({ success: false, msg: "unauthorized user" });
    });
  };
};

module.exports = authToken;
