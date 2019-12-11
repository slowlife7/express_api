import React, { Component, Fragment } from "react";

class PostList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    fetch(this.props.path)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState({
        posts: json.posts
      })
    })
  }

  render() {
    return (
      <Fragment>
        <ul>
          {
            this.state.posts && this.state.posts.map((item, index) => (
              <li key={index}>{item.title} {item.author} {item.created_at}</li>
            ))
          }
        </ul>
      </Fragment>
    )
  }
}

export default PostList;
