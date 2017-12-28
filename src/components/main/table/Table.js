import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {List, ListItem} from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import UpdateDialog from '../dialog/UpdateDialog'
import RemoveDialog from '../dialog/RemoveDialog'
import * as DialogActions from '../../../actions/dialogActions'
import OrderStore from '../../../stores/orderStore'
const Immutable = require('immutable')

export default class TableElement extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      edit: false,
      entries: Immutable.List(),
      selected: -1
    }
  }

  componentDidMount() {
    OrderStore.addChangeListener(this._handleOrderChange)
  }

  componentWillUnmount() {
    OrderStore.removeChangeListener(this._handleOrderChange)
  }

  _isSelected = (index) => {
    return this.state.selected === index
  }

  _handleRowSelection = (selectedRow) => {
    this.setState({
      selected: selectedRow[0]
    })
  }

  _handleOrderChange = () => {
    this.setState({
      entries: OrderStore.getOrders(),
      selected: -1
    })
  }

  _fillTable = () => {
    return this.state.entries.map((entry, index) =>
      <TableRow key={index} selected={this._isSelected(index)}>
        <TableRowColumn>{index + 1}</TableRowColumn>
        <TableRowColumn>{entry.amount}</TableRowColumn>
        <TableRowColumn>{entry.description}</TableRowColumn>
        <TableRowColumn>
          <List>
            {entry.infos.map((text, indexInf) => <ListItem key={index * 10 + indexInf} primaryText={text}/>)}
          </List>
        </TableRowColumn>
        <TableRowColumn>{entry.price}</TableRowColumn>
      </TableRow>
    )
  }

  _addOrder = () => {
    this.setState({
      edit: false
    })

    DialogActions.displayUpdateDialog(true)
  }

  _removeOrder = () => {
    if (this.state.selected === undefined || this.state.selected === -1) {
      return
    }

    DialogActions.displayRemoveDialog(true)
  }

  _updateOrder = () => {
    if (this.state.selected === undefined || this.state.selected === -1) {
      return
    }

    this.setState({
      edit: true
    })

    DialogActions.displayUpdateDialog(true)
  }

  render() {
    return (
      <div className="">
        <p className="bf">Bestellungen</p>
        <div className="pt4 pl4 pr4" style={{width: '70vw'}}>
          <div className="table">
            <Table onRowSelection={this._handleRowSelection}>
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
                {this._fillTable()}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="fr pr4">
          <IconButton tooltip="Bestellung hinzufügen"
            onClick={this._addOrder}>
            <FontIcon className="material-icons">add</FontIcon>
          </IconButton>
          <IconButton tooltip="Bestellung entfernen"
            onClick={this._removeOrder}>
            <FontIcon className="material-icons">remove</FontIcon>
          </IconButton>
          <IconButton tooltip="Bestellung bearbeiten"
            onClick={this._updateOrder}>
            <FontIcon className="material-icons">edit</FontIcon>
          </IconButton>
        </div>
        <UpdateDialog order={this.state.selected} edit={this.state.edit}/>
        <RemoveDialog order={this.state.selected}/>
      </div>
    )
  }
}
