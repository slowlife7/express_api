import React, { Component } from "react";
import styled from "styled-components";
import PostView from "./PostView";

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
`;

class Brief extends Component {
  constructor(props) {
    super(props);
    this.state = {
      briefs: []
    };
  }

  componentDidMount() {
    fetch(this.props.path)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          briefs: json
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderBriefs = briefs =>
    briefs &&
    briefs.map((item, index) => <PostView key={index} {...item}></PostView>);

  render() {
    const { briefs } = this.state;
    return <Flex>{this.renderBriefs(briefs)}</Flex>;
  }
}

export default Brief;
