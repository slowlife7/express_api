import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import  axios from 'axios';

const Login = ({handleSubmit,err, handleChange, userid, password}) => {
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
      {
        <p>{err}</p>
      }
    </form>
  )
}

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      password: "",
      message: "",
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    axios.post("/auth/login", {
      username: this.state.userid,
      password: this.state.password
    })
    .then(response => {
      if (response.status === 200) {
        this.props.handleSubmit(null, response.data.username);
      }
    })
    .catch(err => {
      this.setState({
        userid: "",
        password: ""
      })
      this.props.handleSubmit('아이디 또는 비밀번호가 틀립니다.', null);
    })
  }

  render() {
    return (
      (!this.props.authorized)? 
      <Login 
        userid={this.state.userid}
        err={this.props.err}
        password={this.state.password}
        handleChange={this.handleChange} 
        handleSubmit={this.handleSubmit} 
      />
      :
      <Redirect to="/"/>
    )
  }
}

export default LoginContainer;
