import React, { Fragment } from "react";
import styled from "styled-components";
import PostItem from "./PostItem";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 500px;
`;

const PostView = ({ _id, posts }) => {
  return (
    <Fragment>
      <Flex>
        <ul>
          {posts &&
            posts.map((item) => (
              <PostItem
                key={item._id}
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
