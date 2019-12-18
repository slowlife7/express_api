import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import { logout } from "../services/authentication";
const LogoutButton = styled.button`
  color: #000000;
  padding: 1rem;
  border: none;
  background: #ffffff;
`;

class LogOut extends Component {

  handleClick = (e) => {
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

        this.props.history.replace('/');
        localStorage.clear();
      }
    })();
  }

  render() {
    return (
      <LogoutButton onClick={this.handleClick}>LogOut</LogoutButton>
    )
  }
}

export default withRouter(LogOut);
