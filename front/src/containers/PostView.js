import React, { Fragment } from "react";
import styled from "styled-components";
import PostItem from "./PostItem";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 500px;
`;

const Title = styled.div`
  flex-basis: 50px;
`;

const PostView = ({ _id, posts }) => {
  return (
    <Fragment>
      <Flex>
        <Title>
          <h2>{_id}</h2>
        </Title>
        <ul>
          {posts &&
            posts.map((item, index) => (
              <PostItem
                key={index}
                _id={`/post/${item._id}`}
                title={item.title}
                author={item.author}
                created_at={item.created_at}
              />
            ))}
        </ul>
      </Flex>
    </Fragment>
  );
};

export default PostView;
