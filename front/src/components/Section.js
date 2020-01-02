import React, { Component } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav";
import Login from "../containers/Login";
import Register from "../containers/Register";
import WriteForm from "../containers/WriteForm";
import ReadForm from "../containers/ReadForm";
import WrappedPosts from "../containers/WrappedPosts";

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
            <Route
              path="/auth/register"
              render={props => <Register {...props} />}
            />

            <Route
              path="/category/:title/post"
              render={props => <WriteForm {...props} />}
            />

            <Route path="/post/:id" render={props => <ReadForm {...props} />} />

            <Route
              path="/category/:title"
              render={props => <WrappedPosts {...props} />}
            />

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
