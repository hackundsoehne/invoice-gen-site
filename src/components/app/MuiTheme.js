import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import PropTypes from 'prop-types'

export default class MuiTheme extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: '#A63324',
        primary2Color: '#A63324',
        primary3Color: '#A63324'
      },
      datePicker: {
        overlayStyle: {
          backgroundColor: '#A63324'
        }
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

