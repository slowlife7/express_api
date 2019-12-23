import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { useAuth } from "../store/Authentication";
import Comment from "../containers/Comment";

class WrappedComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnclick = e => {
    this.props.updateComment(this.state.content);
  };

  renderCommentList = comments => {
    return comments.map(item => {
      return (
        <Comment key={item._id} comment={item} onRemove={this.props.onRemove} />
      );
    });
  };

  render() {
    console.log(this.props);
    const { comments } = this.props;
    return (
      <Fragment>
        <div>
          <input
            type="text"
            placeholder="내용"
            name="content"
            onChange={this.handleOnChange}
          />
          <button onClick={this.handleOnclick}>등록</button>
        </div>
        <ul>{comments && this.renderCommentList(comments)}</ul>
      </Fragment>
    );
  }
}

export default withRouter(useAuth(WrappedComment));
