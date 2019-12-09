import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import SideBar from "./components/SideBar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Header = styled.header`
  height: 50px;
  text-align: center;
  border-bottom: 1px solid #cccccc;
`;
const Section = styled.section`
  display: flex;
  height: calc(100% - 50px);
`;
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
const Main = styled.main`
  width: calc(100% - 300px);
`;
const Aside = styled.aside`
  flex-basis: 150px;
  flex-shrink: 0;
  border-left: 1px solid #cccccc;
`;
const Footer = styled.footer`
  text-align: center;
  border-top: 1px solid #cccccc;
`;

const categories = [
  {
    path: "/category/html",
    title: "HTML",
    main: () => Hello()
  },

  {
    path: "/category/javascript",
    title: "JAVASCRIPT",
    main: () => Hello1()
  },

  {
    path: "/category/CSS",
    title: "CSS",
    main: () => Hello2()
  }
];

function App() {
  return (
    <Fragment>
      <Router>
        <Container>
          <Header>
            <h3>Blog LayOut</h3>
          </Header>
          <Section>
            <SideBar path="/category"></SideBar>
            {/*<Nav>
              <ul>
                {categories.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </Nav>*/}

            <Main>
              <Switch>
                <Route exact path="/"></Route>
                {categories.map((link, index) => (
                  <Route
                    key={index}
                    path={link.path}
                    component={link.main}
                  ></Route>
                ))}
              </Switch>
            </Main>
            <Aside></Aside>
          </Section>
          <Footer>
            <p>Copy Right 2019.</p>
          </Footer>
        </Container>
      </Router>
    </Fragment>
  );
}

const Hello = () => <div>Hello</div>;
const Hello1 = () => <div>Hello1</div>;
const Hello2 = () => <div>Hello2</div>;

export default App;
