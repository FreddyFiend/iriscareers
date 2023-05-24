const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      slug: user.slug,
      username: user.username,
      email: user.email,
      isCompany: user.isCompany,
      isAdmin: user.isAdmin,
      profileCompleted: user.profileCompleted,
      roles: user.roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

module.exports = generateToken;
