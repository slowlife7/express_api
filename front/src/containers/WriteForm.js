import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { useAuth } from "../store/Authentication";
import axios from "axios";
const TextArea = styled.textarea`
  width: 98%;
  border: 1px solid #000000;
  margin: 5px 0;
  height: 70vh;
  padding: 1%;
`;

class WriteForm extends Component {
  constructor(props) {
    super(props);

    const { value } = this.props;

    this.state = {
      category: this.props.match.params.title,
      author: value && value.userid,
      title: "",
      content: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleConfirm = e => {
    e.preventDefault();
    axios
      .post(this.props.match.url, this.state)
      .then(response => {
        if (response.status === 201) {
          this.props.history.push(`category/${this.state.category}`);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { value } = this.props;

    return (
      <Fragment>
        <p>{this.props.match.params.title}</p>
        {value && <p>{value.userid}</p>}
        <form onSubmit={this.handleConfirm}>
          <input
            type="text"
            name="title"
            placeholder="제목"
            onChange={this.handleChange}
          />
          <TextArea name="content" onChange={this.handleChange} />
          <button>취소</button>
          <button type="submit">확인</button>
        </form>
      </Fragment>
    );
  }
}

export default useAuth(WriteForm);
