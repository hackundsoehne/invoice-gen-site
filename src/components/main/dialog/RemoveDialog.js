import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import * as DialogActions from '../../../actions/dialogActions'
import * as OrderActions from '../../../actions/orderActions'
import DialogStore from '../../../stores/dialogStore'
import OrderStore from '../../../stores/orderStore'

export default class RemoveDialog extends React.Component {
  static propTypes = {
    order: PropTypes.element.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  componentDidMount() {
    DialogStore.addChangeListener(this._handleDisplay)
  }

  componentWillUnmount() {
    DialogStore.removeChangeListener(this._handleDisplay)
  }

  _handleDisplay = () => {
    this.setState({open: DialogStore.isRemoveDialogOpen()})
  }

  _handleClose = () => {
    DialogActions.displayRemoveDialog(false)
  }

  _handleRemove = () => {
    OrderActions.removeOrder(this.props.order)
    DialogActions.displayRemoveDialog(false)
  }

  render() {
    const actions = [
      <FlatButton
        key={0}
        label="Nein"
        primary={true}
        onClick={this._handleClose}
      />,
      <FlatButton
        key={1}
        label="Ja"
        primary={true}
        keyboardFocused={true}
        onClick={this._handleRemove}
      />
    ]
    console.log(this.props.order)
    const order = OrderStore.getOrder(this.props.order)

    let text = ''
    if (order !== undefined) {
      text = 'Willst du wirklich Bestellung "' + order.description + '" entfernen?'
    }

    return (
      <div>
        <Dialog
          title="Bestellung Entfernen"
          actions={actions}
          modal={false}
          open={this.state.open}
        >
          {text}
        </Dialog>
      </div>
    )
  }
}
