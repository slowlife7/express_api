import React, { Component } from "react";
import styled from "styled-components";
import UserContainer from "../containers/User";

const Wrapper = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  text-align: center;
  border-bottom: 1px solid #cccccc;
`;

class Header extends Component {
  render() {
    return (
      <Wrapper>
        <UserContainer {...this.props}/>
      </Wrapper>
    );
  }
}

export default Header;
