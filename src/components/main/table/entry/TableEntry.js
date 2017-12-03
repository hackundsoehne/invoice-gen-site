import React from 'react'
import {TableRowColumn} from 'material-ui/Table';
import ENV_VARS from '../../../../../tools/ENV_VARS'

export default class TableEntry extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      type: this.props.type,
      meterId: this.props.meterId,
      normalValue: this.props.normalValue,
      buyingValue: this.props.buyingValue,
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let style

    if (this.state.type === ENV_VARS.CONSTANTS.CONSUMER) {
      style = {
        color: "#C62828"
      }
    } else {
      style = {
        color: "#2E7D32"
      }
    }

    return (
      <TableRowColumn
        style={style}>
        {this.state.meterId}
      </TableRowColumn>
    )
  }
}