import React, { Fragment, Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  render() {
    return (
      <Fragment>
        <LoginLink to="/auth/login">Login</LoginLink>
        <RegisterLink to="/auth/register">Register</RegisterLink>
      </Fragment>
    );
  }
}

export default UserContainer;
