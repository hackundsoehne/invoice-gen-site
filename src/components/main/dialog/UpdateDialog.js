import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import {TextField} from 'material-ui'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import * as DialogActions from '../../../actions/dialogActions'
import DialogStore from '../../../stores/dialogStore'
const Immutable = require('immutable')

export default class RemoveDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      entries: Immutable.List(),
      selected: [],
      informationText: ''
    }
  }

  componentDidMount() {
    DialogStore.addChangeListener(this._handleDisplay)
  }

  componentWillUnmount() {
    DialogStore.removeChangeListener(this._handleDisplay)
  }

  _isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1
  }

  _handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    })
  }

  _handleDisplay = () => {
    this.setState({open: DialogStore.isUpdateDialogOpen()});
  }

  _handleClose = () => {
    DialogActions.displayUpdateDialog(false)
  }

  _addInformation = () => {
    if (this.state.informationText === '') {
      return
    }

    this.setState({
      entries: this.state.entries.push(this.state.informationText),
      informationText: ''
    })
  }

  _removeInformation = () => {
    if (this.state.selected.length === 0) {
      return
    }

    this.setState({
      entries: this.state.entries.delete(this.state.selected[0]),
      selected: []
    })
  }

  _mapDataToTable = () => {
    return this.state.entries.map((entry, index) =>
      <TableRow key={index} selected={this._isSelected(index)}>
        <TableRowColumn>{entry}</TableRowColumn>
      </TableRow>
    )
  }

  _handleInformationTextFieldChange = (e) => {
    this.setState({
      informationText: e.target.value
    })
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this._addInformation()
    }
  }

  render() {
    const {hsText, hsFont, hsColor} = styles;

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

    const entries = this._mapDataToTable()

    return (
      <div>
        <Dialog
          title="Bestellung"
          actions={actions}
          modal={false}
          open={this.state.open}
        >
          <TextField
            hintText="Position"
            inputStyle={hsText}
            hintStyle={hsFont}
            style={{
              width: '60px',
              marginLeft: '6px',
              marginRight: '6px'
            }}
            errorText={this.state.company_name}
          />
          <TextField
            hintText="Menge"
            inputStyle={hsText}
            hintStyle={hsFont}
            style={{
              width: '60px',
              marginLeft: '6px',
              marginRight: '6px'
            }}
            errorText={this.state.company_name}
          />
          <TextField
            hintText="Bezeichnung"
            inputStyle={hsText}
            hintStyle={hsFont}
            floatingLabelText={"e.g. 'Basic Sponsoring'"}
            floatingLabelFixed={true}
            style={{
              width: '450px',
              marginLeft: '6px',
              marginRight: '6px'
            }}
            errorText={this.state.company_name}
          />
          <TextField
            hintText="Betrag (EUR)"
            inputStyle={hsText}
            hintStyle={hsFont}
            style={{
              width: '100px',
              marginLeft: '6px',
              marginRight: '6px'
            }}
            errorText={this.state.company_name}
          /><br/>

          <div className="pt4 pb4">
            <Table onRowSelection={this._handleRowSelection}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Zusätzliche Informationen</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                deselectOnClickaway={false}
              >
                {entries}
              </TableBody>
            </Table>

            <div className="pt4">
              <TextField
                value={this.state.informationText}
                hintText="Information hinzufügen"
                inputStyle={hsText}
                hintStyle={hsFont}
                onChange={this._handleInformationTextFieldChange}
                onKeyPress={this._handleKeyPress}
                style={{
                  width: '676px',
                  marginLeft: '6px',
                  marginRight: '6px'
                }}
              />
            </div>
            <div className="fr pr4">
              <IconButton tooltip="Eintrag hinzufügen"
                          onClick={this._addInformation}>
                <FontIcon className="material-icons">add</FontIcon>
              </IconButton>
              <IconButton tooltip="Eintrag entfernen"
                          onClick={this._removeInformation}>
                <FontIcon className="material-icons">remove</FontIcon>
              </IconButton>
            </div>
          </div>

        </Dialog>
      </div>
    )
  }
}

const styles = {
  hsFont: {
    fontFamily: "Source Sans Pro",
  },
  hsColor: {
    color: "#A63324",
  },
  hsText: {
    color: "#A63324",
    fontFamily: "Source Sans Pro",
  },
};
