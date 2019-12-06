const login = passport => {
  return (req, res, next) => {
    passport.authenticate("local")(req, res, () => {
      req.session.save(err => {
        if (err) {
          return next(err);
        }
        res.json({ username: req.user.username });
      });
    });
  };
};

const register = (passport, user) => {
  return (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).end();
    }

    user.register(
      new user({
        username
      }),
      password,
      (err, user) => {
        if (err) {
          if (err.name === "UserExistsError") {
            return res.status(409).end();
          }
          return res.status(500).end();
        }
        passport.authenticate("local")(req, res, () => {
          req.session.save(err => {
            if (err) {
              return next(err);
            }
            res.json({ username: req.user.username });
          });
        });
      }
    );
  };
};

module.exports = {
  login,
  register
};
