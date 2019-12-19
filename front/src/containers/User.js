import React, { Fragment, Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../store/Authentication";
import LogOut from "./Logout";

const LoginLink = styled(Link)`
  text-decoration: none;
  color: #000000;
  padding: 1rem;
`;

const RegisterLink = styled(Link)`
  text-decoration: none;
  color: #000000;
  padding: 1rem;
`;

class UserContainer extends Component {
  componentDidMount() {
    const { setValue } = this.props;
    console.log(localStorage.getItem("userinfo"));
    setValue(JSON.parse(localStorage.getItem("userinfo")));
  }

  render() {
    const { value } = this.props;
    return (
      <Fragment>
        {value && value.loggedin ? (
          <LogOut {...this.props} />
        ) : (
          <Fragment>
            <LoginLink to="/auth/login">Login</LoginLink>
            <RegisterLink to="/auth/register">Register</RegisterLink>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default useAuth(UserContainer);
