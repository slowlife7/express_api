const login = (req, res) => {
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    res.json({username: req.body.username});
  })
}

module.exports = {
  login
}