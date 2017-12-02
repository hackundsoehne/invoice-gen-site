import React from 'react'
import {RaisedButton} from 'material-ui'
const Immutable = require('immutable');

export default class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      company_name: '',
      locale: 'de'
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleChange = (event, date) => {
    this.setState({
      controlledDate: date,
    });
  };

  render() {
    return (
      <div className="db pa4 pt5 pb5">
        <RaisedButton label="Rechnung Erstellen" primary={true} />
      </div>
    )
  }
}
