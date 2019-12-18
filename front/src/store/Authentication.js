import React, { Component, createContext } from "react";

const Context = createContext();
const { Provider, Consumer: AuthConsumer } = Context;

class AuthProvider extends Component {
  state = {
    value: null
  };

  actions = {
    setValue: value => {
      this.setState({
        value
      });
    }
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

function useAuth(WrappedComponent) {
  return function UseAuth(props) {
    return (
      <AuthConsumer>
        {({ state, actions }) => (
          <WrappedComponent
            {...props}
            value={state.value}
            setValue={actions.setValue}
          />
        )}
      </AuthConsumer>
    );
  };
}

export { AuthProvider, AuthConsumer, useAuth };
