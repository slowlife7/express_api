import React, { Fragment, Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import * as Container from "../containers";
import Posts from "../containers/Posts";
import Axios from "axios";

class WrapperComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: {
        userid: "",
        err: "",
        password: "",
        authorized: false
      },
      sidebar: [
        {
          exact: true,
          path: "/index",
          main: () => <Container.Brief path={`/index`} />
        }
      ]
    };
  }

  handleSubmit = (err, userid) => {
    this.setState({
      userinfo: {
        userid,
        err,
        authorized: !err ? true : false
      }
    });
  };

  componentDidMount() {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    if (userinfo) {
      this.setState({
        userinfo
      });
    }

    fetch("/category")
      .then(response => response.json())
      .then(json => {
        const categories = json.map(item => {
          return {
            title: item.title,
            path: `/category/${item.title}`,
            main: () => <Posts path={`/category/${item.title}`} />
          };
        });

        this.setState({
          sidebar: this.state.sidebar.concat(categories)
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userinfo.userid !== this.state.userinfo.userid) {
      localStorage.setItem("userinfo", JSON.stringify(this.state.userinfo));
    }
  }

  handleLogout = e => {
    Axios.get("/auth/logout")
      .then(response => {
        this.setState({
          userinfo: {
            userid: "",
            authorized: false
          }
        });
        localStorage.clear();
      })
      .catch(err => {});
  };

  render() {
    console.log("render");
    const loginRoute = {
      title: "login",
      path: "/login",
      main: () => (
        <Container.Login
          handleSubmit={this.handleSubmit}
          authorized={this.state.userinfo.authorized}
          err={this.state.userinfo.err}
        />
      )
    };

    const signupRoute = {
      title: "signup",
      path: "/signup",
      main: () => (
        <Container.Register
          handleSubmit={this.handleSubmit}
          authorized={this.state.userinfo.authorized}
        />
      )
    };

    const routes = [...this.state.sidebar, loginRoute, signupRoute];

    return (
      <Fragment>
        <Router>
          <Container.Wrapper>
            <Container.Header
              {...this.state.userinfo}
              logout={this.handleLogout}
            />
            <Container.Section sidebar={this.state.sidebar} routes={routes} />
            <Container.Footer />
          </Container.Wrapper>
        </Router>
      </Fragment>
    );
  }
}

export default WrapperComponent;
