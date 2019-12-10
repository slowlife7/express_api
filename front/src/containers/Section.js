import React from 'react';
import styled from "styled-components";
import { Navigator } from '../containers';
import { Switch, Route } from "react-router-dom";

const Section = styled.section`
  display: flex;
  height: calc(100% - 50px);
`;

const SectionContainer = ({sidebar, routes}) => (
  <Section>
    <Navigator items={sidebar} />
    <Switch>
      {
        routes.map((route, index) => (
          <Route
            exact={route.exact}
            key={index}
            path={route.path}
            children={<route.main />}
          />
        ))
      }
    </Switch>
  </Section>
)

export default SectionContainer;



