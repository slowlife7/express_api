import React, { Fragment, Component } from "react";
import styled from "styled-components";
import SideBarItem from "./SideBarItem";

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

class SideBar extends Component {
  state = {};
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.path);
    fetch(this.props.path)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          items: [...json]
        });
      });
  }

  render() {
    return (
      <Fragment>
        <Nav>
          <ul>
            {this.state.items &&
              this.state.items.map((item, index) => (
                <SideBarItem
                  key={item._id}
                  path={item.title}
                  title={item.title}
                ></SideBarItem>
              ))}
          </ul>
        </Nav>
      </Fragment>
    );
  }
}

export default SideBar;
