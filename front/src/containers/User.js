import React, { Fragment, Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../store/Authentication";
import LogOut from "./Logout";
import axiois from "axios";

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
    console.log(sessionStorage.getItem("userinfo"));
    setValue(JSON.parse(sessionStorage.getItem("userinfo")));
  }

  componentDidUpdate() {
    console.log("userupdate");

    axiois.get("/auth/check").then(response => {
      const { check } = response.data;
      if (!check) {
        sessionStorage.removeItem("userinfo");
      }
    });
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
