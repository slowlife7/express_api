import React, { Component } from "react";
import styled from "styled-components";
import PostView from "../containers/PostView";
import Axios from "axios";

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
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
    briefs.map((item, index) => <PostView key={index} {...item}></PostView>);

  render() {
    const { briefs } = this.state;
    return <Flex>{this.renderBriefs(briefs)}</Flex>;
  }
}

export default Home;
