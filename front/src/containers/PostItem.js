import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const FlexLi = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 1px solid #000000;
  padding: 1em 0;
  & a {
    list-style: none;
    text-decoration: none;
  }
`;

const Title = styled.div`
  flex-grow: 4;
`;

const Author = styled.div`
  flex-grow: 1;
`;

const Created = styled.div`
  flex-grow: 1;
`;

const PostItem = ({ _id, title, author, created_at }) => {
  return (
    <FlexLi key={_id}>
      <Title>
        <Link to={_id}>{title}</Link>
      </Title>
      <Author>{author}</Author>
      <Created>
        <Moment format="YYYY-MM-DD HH:mm">{created_at}</Moment>
      </Created>
    </FlexLi>
  );
};

export default PostItem;
