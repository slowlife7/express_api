import React from "react";
import styled from "styled-components";
import { Navigator } from "../containers";
import { Switch, Route, Redirect } from "react-router-dom";

const Section = styled.section`
  display: flex;
  min-height: 100vh;
`;

const Main = styled.main`
  width: 90%;
`;

const SectionContainer = ({ sidebar, routes }) => (
  <Section>
    <Navigator items={sidebar} />
    <Main>
      <Switch>
        {routes.map((route, index) => (
          <Route
            exact={route.exact}
            key={index}
            path={route.path}
            children={<route.main />}
          />
        ))}
        <Route path="/post/:id">{<div></div>}</Route>
        <Redirect from="*" to="/index" />
      </Switch>
    </Main>
  </Section>
);

export default SectionContainer;
