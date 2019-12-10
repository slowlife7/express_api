import React, { Fragment, Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import * as Container from '../containers';

class WrapperComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      password: "",
      authorized: false
    }
  }

  handleSubmit = e => {
    if ( e !== "") {
      this.setState({
        authorized: true
      })
    }
  }

  render() {
    const loginRoute = {
      title: 'login',
      path: '/login',
      main: () => (
        <Container.Login 
          handleSubmit={this.handleSubmit} 
          authorized={this.state.authorized}
        /> 
      )
    };

    const signupRoute = {
      title: 'signup',
      path: '/signup',
      main: () => <div>Signup</div>
    };

    const logoutRoute = {
      title: 'logout',
      path: '/logout',
      main: () => (
        <div>Logout</div>
      )
    }
   
    const routes = [
        {
          exact: true,
          path: '/',
          main: () => <div>Main</div>
        },
        {
          title: 'html',
          path: '/html',
          main: () => <div>html</div>
        },
        {
          title: 'css',
          path: '/css',
          main: () => <div>css</div>
        },
        {
          title: 'javascript',
          path: '/javascript',
          main: () => <div>javascript</div>
        },
        loginRoute,
        signupRoute,
        logoutRoute
    ];

    console.log(this.state.userid);
    return (
      <Fragment>
        <Router>
          <Container.Wrapper>
            <Container.Header 
              user={
                (this.state.authorized)? [logoutRoute] : [loginRoute, signupRoute]
              }
            />
            <Container.Section sidebar={routes.slice(0,4)} routes={routes}/>
            <Container.Footer/>
          </Container.Wrapper>
        </Router>
      </Fragment>
    )
  }
}

export default WrapperComponent;