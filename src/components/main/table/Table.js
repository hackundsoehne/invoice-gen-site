import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import TableEntry from "./entry/TableEntry"
// import EntryStore from "../../../stores/entryStore"
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
    // EntryStore.addChangeListener(this._updateEntries.bind(this))
  }

  componentWillUnmount() {
    // EntryStore.removeChangeListener(this._updateEntries.bind(this))
  }

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

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
                  <TableHeaderColumn>Betrag</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow selected={this.isSelected(0)}>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>John Smith</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
                <TableRow selected={this.isSelected(1)}>
                  <TableRowColumn>2</TableRowColumn>
                  <TableRowColumn>Randal White</TableRowColumn>
                  <TableRowColumn>Unemployed</TableRowColumn>
                </TableRow>
                <TableRow selected={this.isSelected(2)}>
                  <TableRowColumn>3</TableRowColumn>
                  <TableRowColumn>Stephanie Sanders</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
                <TableRow selected={this.isSelected(3)}>
                  <TableRowColumn>4</TableRowColumn>
                  <TableRowColumn>Steve Brown</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="fr pr4">
          <IconButton tooltip="Bestellung hinzufügen">
            <FontIcon className="material-icons">add</FontIcon>
          </IconButton>
          <IconButton tooltip="Bestellung entfernen">
            <FontIcon className="material-icons">remove</FontIcon>
          </IconButton>
          <IconButton tooltip="Bestellung bearbeiten">
            <FontIcon className="material-icons">edit</FontIcon>
          </IconButton>
        </div>
      </div>
    )
  }
}