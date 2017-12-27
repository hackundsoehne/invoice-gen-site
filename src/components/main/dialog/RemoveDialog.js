import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import * as DialogActions from '../../../actions/dialogActions'
import DialogStore from '../../../stores/dialogStore'

export default class RemoveDialog extends React.Component {
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
    this.setState({open: DialogStore.isRemoveDialogOpen()});
  }

  _handleClose = () => {
    DialogActions.displayRemoveDialog(false)
  }

  render() {
    const actions = [
      <FlatButton
        label="Nein"
        primary={true}
        onClick={this._handleClose}
      />,
      <FlatButton
        label="Ja"
        primary={true}
        keyboardFocused={true}
        onClick={this._handleClose}
      />,
    ]

    const text = "Willst du wirklich Bestellung \"" + this.props.order + "\" entfernen?"

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
