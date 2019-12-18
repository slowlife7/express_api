import axios from "axios";
const authenticate = async req => {
  try {
    return await axios.post(req.url, {
      username: req.username,
      password: req.password
    });
  } catch (err) {
    return {
      err
    };
  }
};

const logout = async req => {
  try {
    return await axios.get(req.url);
  } catch (err) {
    return {
      err
    };
  }
};

export { authenticate, logout };
