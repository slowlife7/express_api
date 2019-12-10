import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = styled.header`
  display:flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  text-align: center;
  border-bottom: 1px solid #cccccc;
`;

const Menu = styled.div``;

const Title = styled.div``;

const User = styled.div`
`;

const HeaderContainer = ({user}) => (
  <Header>
    <Menu>

    </Menu>
    <Title>
      <h2>Blog Layout</h2>
    </Title>
    <User>
      {
        user.map((u, i) => (
          <Link key={i} to={u.path}>{u.title}</Link>
        ))
      }
    </User>
  </Header>
)

export default HeaderContainer;



