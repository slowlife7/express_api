import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import * as Container from '../containers';

class WrapperComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      password: ""
    }
  }

  handleSubmit = e => {
    this.setState({
      userid: e
    });
  }

  render() {

    const routes = {
      sidebar: [
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
        }
      ],
      user:[
        {
          title: 'login',
          path: '/login',
          main: () => (
            (this.state.userid === "") ?
            <Container.Login 
              handleSubmit={this.handleSubmit} 
            /> :
            <Redirect to="/" />
          )
        },
        {
          title: 'signup',
          path: '/signup',
          main: () => <div>Signup</div>
        }
      ]
    };
    const routesArray = [...routes.sidebar, ...routes.user];
    console.log(this.state.userid);
    return (
      <Fragment>
        <Router>
          <Container.Wrapper>
            <Container.Header user={routes.user}/>
            <Container.Section sidebar={routes.sidebar} routes={routesArray}/>
            <Container.Footer/>
          </Container.Wrapper>
        </Router>
      </Fragment>
    )
  }
}

export default WrapperComponent;