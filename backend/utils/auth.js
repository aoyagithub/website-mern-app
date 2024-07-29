const auth = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res
      .status(401)
      .json({ message: 'You need to log in to access this resource' });
  }
};

module.exports = auth;
