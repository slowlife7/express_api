import React, { Component } from "react";

const Login = ({handleSubmit, handleChange, userid, password}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        UserID:
        <input type="text" name="userid" value={userid} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={password} onChange={handleChange} />
      </label>
      <input type="submit" value="submit" />
    </form>
  )
}

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      password: "",
      message: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.userid === 'billy') {
      this.props.handleSubmit(this.state.userid);
    } else {
      this.props.handleSubmit("");
    }
  }

  render() {
    return (
      <Login 
        userid={this.state.userid}
        password={this.state.password}
        handleChange={this.handleChange} 
        handleSubmit={this.handleSubmit} 
      />
    )
  }
}

export default LoginContainer;
