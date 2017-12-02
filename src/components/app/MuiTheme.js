import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

export default class MuiTheme extends React.Component {
  render() {
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: "#A63324",
        primary2Color: "#A63324",
        primary3Color: "#A63324"
      },
      datePicker: {
        background: '#A63324'
      }
    })

    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            {this.props.children}
          </div>
        </MuiThemeProvider>
      </div>
    )
  }

}