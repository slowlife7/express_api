import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { useAuth } from "../store/Authentication";
import axios from "axios";
import WrappedComment from "../containers/WrappedComment";

const TextArea = styled.div`
  width: 98%;
  border: 1px solid #000000;
  margin: 5px 0;
  padding: 1%;
`;

class ReadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      author: "",
      title: "",
      content: "",
      category: "",
      comments: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`/post/${id}`)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          const {
            _id,
            title,
            content,
            category,
            author,
            comments
          } = response.data;
          this.setState({
            _id,
            author,
            title,
            content,
            category,
            comments
          });
        }
      })
      .catch(err => {});
  }

  updateComment = comment => {
    const { _id, value } = this.props;

    axios
      .post(`/post/${this.state._id}/comment`, {
        author: value.userid,
        content: comment
      })
      .then(response => {
        console.log(response);
        if (response.status === 201) {
          this.setState({
            comments: this.state.comments.concat(response.data)
          });
        }
      })
      .catch(err => {});
  };

  handleRemove = id => {
    console.log(`/post/${this.state._id}/comment/${id}`);

    axios
      .delete(`/post/${this.state._id}/comment/${id}`)
      .then(response => {
        console.log("id:", response.data.id);
        this.setState({
          comments: this.state.comments.filter(
            item => item._id !== response.data.id
          )
        });
      })
      .catch(err => {});
  };

  render() {
    console.log(this.props);
    const { _id, title, content, category, author, comments } = this.state;
    return (
      <Fragment>
        <p>{category}</p>
        <p>{author}</p>
        <div>{title}</div>
        <TextArea>{content}</TextArea>
        <WrappedComment
          _id={_id}
          comments={comments}
          updateComment={this.updateComment}
          onRemove={this.handleRemove}
        />
      </Fragment>
    );
  }
}

export default useAuth(ReadForm);
