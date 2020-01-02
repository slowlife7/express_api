import React, { Component } from "react";
import axios from "axios";

const Register = props => {
  console.log(props);
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <input
          type="text"
          name="userid"
          placeholder="userid"
          onChange={props.onChange}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={props.onChange}
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={props.onChange}
        />
      </div>

      <button type="submit">가입</button>
    </form>
  );
};

class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      password: "",
      email: "",
      error: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log("qrqrq");

    axios
      .post("/auth/register", {
        username: this.state.userid,
        password: this.state.password,
        email: this.state.email
      })
      .then(response => {
        console.log(response);
        this.setState({
          userid: "",
          password: "",
          email: ""
        });

        this.props.history.replace("/");
      });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    console.log("register");
    return (
      <Register
        {...this.state}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
    );
  }
}

export default RegisterContainer;
