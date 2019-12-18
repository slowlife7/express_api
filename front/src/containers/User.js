import React, { Fragment, Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../store/Authentication";
import { logout } from "../services/authentication";

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

const LogoutButton = styled.button`
  color: #000000;
  padding: 1rem;
  border: none;
  background: #ffffff;
`;

class UserContainer extends Component {
  componentDidMount() {
    const { setValue } = this.props;
    setValue(JSON.parse(localStorage.getItem("userinfo")));
  }

  handleLogout = e => {
    (async () => {
      const { err } = await logout({
        url: "/auth/logout"
      });

      if (!err) {
        const { setValue } = this.props;
        setValue({
          userid: "",
          loggedin: false
        });
        localStorage.clear();
      }
    })();
  };

  render() {
    const { value } = this.props;
    return (
      <Fragment>
        {value && value.loggedin ? (
          <LogoutButton onClick={this.handleLogout}>Logout</LogoutButton>
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
