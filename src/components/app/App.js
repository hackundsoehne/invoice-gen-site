import React from "react";
import MuiTheme from "../app/MuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";
import PropTypes from 'prop-types';

export default class App extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  }

  constructor() {
    super()
    injectTapEventPlugin();
  }

  render() {
    return (
      <MuiTheme>
        {this.props.children}
      </MuiTheme>
    )
  }
}