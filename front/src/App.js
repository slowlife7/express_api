import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Section from "./components/Section";
import Footer from "./components/Footer";
import { AuthProvider } from "./store/Authentication";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const navItems = [
  {
    path: "/category/html",
    title: "html"
  },
  {
    path: "/category/css",
    title: "css"
  },
  {
    path: "/category/javascript",
    title: "javascript"
  }
];

function App() {
  return (
    <AuthProvider>
      <Flex>
        <Header />
        <Section navItems={navItems}></Section>
        <Footer />
      </Flex>
    </AuthProvider>
  );
}

export default App;
