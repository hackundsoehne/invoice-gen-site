import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
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
    this.setState({open: DialogStore.isUpdateDialogOpen()});
  }

  _handleClose = () => {
    DialogActions.displayUpdateDialog(false)
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this._handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this._handleClose}
      />,
    ]

    return (
      <div>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
      </div>
    )
  }
}