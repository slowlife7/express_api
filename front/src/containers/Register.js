import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import  axios from 'axios';

const Register = ({handleSubmit, handleChange, userid, password}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        UserID:
        <input type="text" name="userid" value={userid} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={password} onChange={handleChange} />
      </label>
      <input type="submit" value="submit" />
    </form>
  )
}

class RegisterContainer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      password: ""
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    axios.post("/auth/register", {
      username: this.state.userid,
      password: this.state.password
    })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        this.props.handleSubmit(response.data.username);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <Fragment>
        {
           (!this.props.authorized)? 
            <Register 
            handleSubmit={this.handleSubmit} 
            handleChange={this.handleChange}
            userid={this.state.userid}
            password={this.state.password}
          /> : 
          <Redirect to="/" />
        }
        
      </Fragment>
    )
  }
}

export default RegisterContainer;
