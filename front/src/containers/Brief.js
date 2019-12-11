import React, { Component, Fragment } from "react";

class Brief extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      briefs: []
    }
  }

  componentDidMount() {
    fetch(this.props.path)
    .then(response => {
      return response.json();
    })
    .then(json => {
      this.setState({
        briefs: json
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }

  render() {
    return (
      <Fragment>
        {
          (this.state.briefs && this.state.briefs.map((item, index) => (
            <div key={index}> {item._id} </div>
          )))
        }
      </Fragment>
    )
  }
}

export default Brief;
