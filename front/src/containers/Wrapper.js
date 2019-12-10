import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const WrapperContainer = (props) => (
  <Wrapper>
    {props.children}
  </Wrapper>
)

export default WrapperContainer;



