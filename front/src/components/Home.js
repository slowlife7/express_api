import React, { Component } from "react";
import styled from "styled-components";
import PostView from "../containers/PostView";
import Axios from "axios";
import PostHeader from "./PostHeader";

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 600px;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      briefs: []
    };
  }

  componentDidMount() {
    Axios.get("/index")
      .then(response => {
        if (response.status === 200) {
          this.setState({
            briefs: response.data
          });
        }
      })
      .catch(err => {});
  }

  renderBriefs = briefs =>
    briefs &&
    briefs.map((item, index) => 
      <Container>
        <PostHeader>
          <span>{item._id}</span>
        </PostHeader>
        <PostView key={index} {...item}></PostView>
      </Container>
      );

  render() {
    const { briefs } = this.state;
    return <Flex>{this.renderBriefs(briefs)}</Flex>;
  }
}

export default Home;
