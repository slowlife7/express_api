import React, { Component } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav";
import Login from "../containers/Login";
import WrappedPosts from "../containers/WrappedPosts";

const DummyRegister = () => <div>Register</div>;
const WritePost = () => <div>post~~~~</div>;
const Wrapper = styled.section`
  display: flex;
  width: 100%;
`;

const Main = styled.div`
  flex: 8;
`;

const Aside = styled.div`
  flex: 2;
`;

class Section extends Component {
  render() {
    return (
      <Wrapper>
        <Nav {...this.props} />
        <Main>
          <Switch>
            <Route path="/auth/login" render={props => <Login {...props} />} />
            <Route path="/auth/register" render={DummyRegister} />
            <Route
              path="/category/:title"
              render={props => <WrappedPosts {...props} />}
            />
            <Route path="/post" render={WritePost} />

            <Route
              {...this.props}
              exact
              path="/"
              render={props => <Home {...props} />}
            />
          </Switch>
        </Main>
        <Aside />
      </Wrapper>
    );
  }
}

export default Section;
