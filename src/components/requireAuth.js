import React from "react";
import { connect } from "react-redux";

export default (ChildComponent) => {
  class ComposedComponent extends React.Component {
    //Component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    //When component gets updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push("/");
      }
    }

    render() {
      const newProps = {
        test: () => console.log(1),
      };
      return <ChildComponent {...this.props} {...newProps} />;
    }
  }

  const mapStateToProps = (state) => {
    return {
      auth: state.auth,
    };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
