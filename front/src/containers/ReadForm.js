import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { useAuth } from "../store/Authentication";
import axios from "axios";
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
      author: "",
      title: "",
      content: "",
      category: ""
    };
  }
  
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/post/${id}`)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          const { title, content, category, author } = response.data;
          this.setState({
            author,
            title,
            content,
            category
          });
        }
      })
      .catch(err => {

      })
  }

  render() {
    const { title, content, category, author } = this.state;
    return (
      <Fragment>
        <p>{category}</p>
        <p>{author}</p>
        <div>
          {title}
        </div>
        <TextArea>
          {content}
        </TextArea>
      </Fragment>
    );
  }
}

export default useAuth(ReadForm);
