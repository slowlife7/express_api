import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-basis: 50px;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 10px;
  & > span {
    padding-left: 40px;
  }
`;
class PostHeader extends Component {
  render() {
    return (
      <Wrapper>
        {this.props.children}
      </Wrapper>
    );
  }
}

export default PostHeader;
