import React, { Component } from "react";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
`;

class Brief extends Component {
  render() {
    return <Flex></Flex>;
  }
}

export default Brief;
