import React, { Fragment, Component } from 'react';
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

const LogoutButton = styled.button``;

const AuthUser = ({logout}) => (
  <LogoutButton onClick={logout}>로그아웃</LogoutButton>
)

const UnAuthUser = () => {
  return (
    <Fragment>
      <Link to="/login">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </Fragment>
  )
}

const HeaderContainer = ({authorized, logout}) => (
  <Header>
    <Menu>

    </Menu>
    <Title>
      <h2>Blog Layout</h2>
    </Title>
    <User>
      {
        (authorized) ? <AuthUser logout={logout} /> :
          <UnAuthUser />
      }
    </User>
  </Header>
)

class HeaderComponent extends Component {

  render() {
    return (
      <HeaderContainer 
        authorized={this.props.authorized}
        logout={this.props.logout}
      /> 
    )
  }
}

export default HeaderComponent;



