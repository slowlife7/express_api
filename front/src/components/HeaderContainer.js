import React from "react";
import styled from "styled-components";

const Header = styled.header``;

function HeaderContainer(props) {
  return <Header>{props.children}</Header>;
}

export default HeaderContainer;
