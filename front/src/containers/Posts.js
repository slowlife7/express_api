import React, { Component } from "react";
import PostView from "./PostView";
import Axios from "axios";
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      posts: []
    };
  }

  componentDidMount() {
    const { path } = this.props;
    Axios.get(path)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            _id: response.data.title,
            posts: response.data.posts
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return <PostView {...this.state} />;
  }
}

export default Posts;
