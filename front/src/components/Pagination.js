import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.li`
  border: 1px solid #cccccc;
  list-style: none;

  & > a {
    text-decoration: none;
    padding: 1rem;
    color: #000000;
  }
`;

// /category/javascript?skip=0&limit=10
const Pagination = ({ pageinfo }) => {
  return <Container>{pageinfo}</Container>;
};

const Page = ({ no, to }) => {
  return (
    <Box>
      <Link to={to}>{no}</Link>
    </Box>
  );
};

class Paging extends Component {
  renderPageBoxes = () => {
    const { pageinfo, url } = this.props;
    const pageBoxes = [];
    pageinfo.prev &&
      pageBoxes.push(
        <Page
          key={pageinfo.prev}
          no={"<"}
          to={`${url}?skip=${pageinfo.prev}&limit=10`}
        />
      );
    for (let i = pageinfo.first; i <= pageinfo.last; i++) {
      pageBoxes.push(
        <Page
          key={i}
          no={i}
          to={`${url}?skip=${i - 1}&limit=5`}
        />
      );
    }
    pageinfo.next &&
      pageBoxes.push(
        <Page
          key={pageinfo.prev}
          no={"<"}
          to={`${url}?skip=${pageinfo.next}&limit=10`}
        />
      );
    return pageBoxes;
  };

  render() {
    return <Pagination pageinfo={this.renderPageBoxes()} />;
  }
}

export default Paging;
