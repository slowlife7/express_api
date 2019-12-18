import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.nav`
  flex-basis: 150px;
  flex-shrink: 0;
  flex: 1;
  border-right: 1px solid #cccccc;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #000000;
  padding: 1rem;
`;

const Li = styled.li`
  list-style: none;
  padding: 1rem;
`;

class Nav extends Component {
  renderNavigator() {
    const { navItems } = this.props;

    return (
      navItems &&
      navItems.map((item, index) => {
        return (
          <Li key={index}>
            <NavLink to={item.path}>{item.title}</NavLink>
          </Li>
        );
      })
    );
  }

  render() {
    return <Wrapper>{this.renderNavigator()}</Wrapper>;
  }
}

export default Nav;
