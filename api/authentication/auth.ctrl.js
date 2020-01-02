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

const logout = (req, res) => {
  req.logout();
  res.status(200).end();
};

const register = (passport, user) => {
  return (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    console.log(username);
    console.log(password);
    console.log("email:", email);

    if (!username || !password || !email) {
      return res.status(400).end();
    }

    user.register(
      new user({
        username,
        email
      }),
      password,
      (err, user) => {
        if (err) {
          console.log(err);
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

const check = (req, res) => {
  res.json({ checked: req.isAuthenticated });
};

module.exports = {
  login,
  logout,
  register,
  check
};
