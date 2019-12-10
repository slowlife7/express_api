import React from 'react';
import styled from "styled-components";

const Footer = styled.header`
  height: 50px;
  text-align: center;
  border-top: 1px solid #cccccc;
`;

const FooterContainer = (props) => (
  <Footer>
     <p>Copy right reserved 2019.</p>
  </Footer>
)

export default FooterContainer;



