import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {List, ListItem} from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import UpdateDialog from '../dialog/UpdateDialog'
import RemoveDialog from '../dialog/RemoveDialog'
import * as DialogActions from '../../../actions/dialogActions'
import DialogStore from '../../../stores/dialogStore'
const Immutable = require('immutable')

export default class TableElement extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      entries: [],
      selected: []
    }
  }

  componentDidMount() {
    // DialogStore.addChangeListener(this._toggle.bind(this))
  }

  componentWillUnmount() {
    // EntryStore.removeChangeListener(this._updateEntries.bind(this))
  }

  _isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1
  }

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    })
  }

  _updateDialogOpen = () => {
    DialogActions.displayUpdateDialog(true)
    this._fillTable()
  }

  _removeDialogOpen = () => {
    DialogActions.displayRemoveDialog(true)
  }

  _fillTable = () => {
    let data = [{
      pos: 1,
      amount: 2,
      name: 'Tesla',
      info: ['info 1', 'info 2', 'info 3'],
      price: 1000
    }]

    let entriesList = Immutable.List(data)

    entriesList = entriesList.map((entry, index) =>
      <TableRow key={index} selected={this._isSelected(index)}>
        <TableRowColumn>{entry.pos}</TableRowColumn>
        <TableRowColumn>{entry.amount}</TableRowColumn>
        <TableRowColumn>{entry.name}</TableRowColumn>
        <TableRowColumn>
          <List>
            {entry.info.map((text, indexInf) => <ListItem key={index * 10 + indexInf} primaryText={text}/>)}
          </List>
        </TableRowColumn>
        <TableRowColumn>{entry.price}</TableRowColumn>
      </TableRow>
    )

    this.setState({
      entries: entriesList
    })
  }

  _updateEntries = () => {
    // let entriesList = Immutable.List(EntryStore.getEntries())
    // entriesList = entriesList.map(entry => <TableRow selected={entry.checked}>
    //   <TableEntry
    //     type={entry.type}
    //     meterId={entry.meterId}
    //     normalValue={entry.normalValue}
    //     buyingValue={entry.buyingValue}
    //     checked={entry.checked}
    //   />
    // </TableRow>)
    //
    // this.setState({
    //   entries: []
    // })
    //
    // this.setState({
    //   entries: entriesList
    // })
  }

  _handleCellClick = (rowNumber, columnNumber, evt) => {
    // let entryState = EntryStore.getEntryStates()[rowNumber].checked
    //
    // let value
    // if (!entryState) {
    //   value = EntryStore.getEntries()[rowNumber].buyingValue
    // } else {
    //   value = EntryStore.getEntries()[rowNumber].normalValue
    // }
    //
    // EntryStore.updateEntryState(rowNumber, !entryState, value)
  }

  render () {

    return (
      <div className="">
        <p className="bf">Bestellungen</p>
        <div className="pt4 pl4 pr4" style={{width: '70vw'}}>
          <div className="table">
            <Table onRowSelection={this.handleRowSelection}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Position</TableHeaderColumn>
                  <TableHeaderColumn>Menge</TableHeaderColumn>
                  <TableHeaderColumn>Bezeichnung</TableHeaderColumn>
                  <TableHeaderColumn>Zusätzliche Informationen</TableHeaderColumn>
                  <TableHeaderColumn>Betrag (EUR)</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                deselectOnClickaway={false}
              >
                {this.state.entries}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="fr pr4">
          <IconButton tooltip="Bestellung hinzufügen"
            onClick={this._updateDialogOpen}>
            <FontIcon className="material-icons">add</FontIcon>
          </IconButton>
          <IconButton tooltip="Bestellung entfernen"
            onClick={this._removeDialogOpen}>
            <FontIcon className="material-icons">remove</FontIcon>
          </IconButton>
          <IconButton tooltip="Bestellung bearbeiten"
            onClick={this._updateDialogOpen}>
            <FontIcon className="material-icons">edit</FontIcon>
          </IconButton>
        </div>
        <UpdateDialog/>
        <RemoveDialog order={this.state.selected}/>
      </div>
    )
  }
}