import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../store/Authentication";
import { authenticate } from "../services/authentication";

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
            {props.error ? <p>{props.error}</p> : <p></p>}
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

    (async () => {
      const res = await authenticate({
        url: "/auth/login",
        username: this.state.userid,
        password: this.state.password
      });

      console.log("res:", res);
      console.log("status:", res.status);

      if (res.err || res.status !== 200) {
        return this.setState({
          userid: "",
          password: "",
          error: "비밀번호 또는 아이디가 틀립니다."
        });
      }

      this.props.setValue({
        userid: res.data.username,
        loggedin: true
      });

      //console.log("userid:", data.userid);

      localStorage.setItem(
        "userinfo",
        JSON.stringify({
          userid: res.data.username,
          loggedin: true
        })
      );

      this.props.history.replace("/");
    })();
  };

  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <Login {...this.state} onSubmit={handleSubmit} onChange={handleChange} />
    );
  }
}

export default useAuth(LoginContainer);
