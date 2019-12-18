import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const WrapperLogin = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const FormLogin = styled.div`
  height: 500px;
  background: #ffffff;
`;
const LoginHeader = styled.div`
  text-align: left;
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const LoginContent = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const LoginButton = styled.button`
  width: 100%;
  background: #337ab7;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: none;
  padding: 8px;
  color: #ffffff;
`;

const InputText = styled.input`
  width: 100%;
  padding: 4px 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const Login = props => {
  return (
    <WrapperLogin>
      <FormLogin>
        <LoginHeader>
          <h2>Sign in</h2>
          <Link to="/auth/register">create an account</Link>
        </LoginHeader>

        <LoginContent>
          <form onSubmit={props.onSubmit}>
            <InputText
              type="text"
              name="userid"
              placeholder="아이디"
              value={props.userid}
              onChange={props.onChange}
            />
            <InputText
              type="password"
              name="password"
              placeholder="비밀번호"
              value={props.password}
              onChange={props.onChange}
            />
            <LoginButton>Sign In </LoginButton>
          </form>
        </LoginContent>
      </FormLogin>
    </WrapperLogin>
  );
};

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

    axios
      .post("/auth/login", {
        username: this.state.userid,
        password: this.state.password
      })
      .then(response => {
        if (response.status === 200) {
          this.props.history.replace("/");
        }
      })
      .catch(err => {
        this.setState({
          userid: "",
          password: ""
        });
        //this.props.handleSubmit("아이디 또는 비밀번호가 틀립니다.", null);
      });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <Login {...this.state} onSubmit={handleSubmit} onChange={handleChange} />
    );
  }
}

export default LoginContainer;
