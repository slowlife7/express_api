import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { useAuth } from "../store/Authentication";
const Wrapper = styled.li`
  text-decoration: none;
  list-style: none;
`;

const Content = styled.span`
  padding: 1rem;
`;

const Author = styled(Content)``;

const Created = styled(Moment)`
  padding: 1rem;
`;

class Comment extends Component {
  handleRemove = () => {
    const { comment, onRemove } = this.props;
    onRemove(comment._id);
  };

  renderPrivateSection = () => {
    const { author } = this.props.comment;
    const { value } = this.props;

    console.log("author:", author);
    console.log("userid:", value.userid);

    if (author === value.userid) {
      console.log("same");
      return (
        <Fragment>
          <button>수정</button>
          <button onClick={this.handleRemove}>삭제</button>
        </Fragment>
      );
    }
  };

  render() {
    const { content, author, createdAt } = this.props.comment;
    return (
      <Fragment>
        <Wrapper>
          <div>
            <Content>{content}</Content>
            <Author>{author}</Author>
            <Created format="YYYY-MM-DD HH:mm">{createdAt}</Created>
            {this.renderPrivateSection()}
          </div>
        </Wrapper>
      </Fragment>
    );
  }
}

export default useAuth(Comment);
