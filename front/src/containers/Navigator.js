import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
flex-basis: 150px;
flex-shrink: 0;
border-right: 1px solid #cccccc;
& a {
  text-decoration: none;
}
& li {
  list-style: none;
}
`;

const NavContainer = (props) => (
  <Nav>
    <ul>
      {
        props.items.map((item, index) => {
          return <li key={index}><Link to={item.path}>{item.title}</Link></li>
        })
      }
    </ul>
  </Nav>
)

export default NavContainer;




