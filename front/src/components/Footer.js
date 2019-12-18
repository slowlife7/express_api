import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
  text-align: center;
  border-top: 1px solid #cccccc;
`;

class Footer extends Component {
  render() {
    return <Wrapper>Copy right</Wrapper>;
  }
}

export default Footer;
