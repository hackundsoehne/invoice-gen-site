import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import {TextField} from 'material-ui'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import * as DialogActions from '../../../actions/dialogActions'
import * as OrderActions from '../../../actions/orderActions'
import DialogStore from '../../../stores/dialogStore'
import OrderStore from '../../../stores/orderStore'
import Immutable from 'immutable'


const OrderRecord = Immutable.Record({
  'amount': '',
  'description': '',
  'price': '',
  'infos': Immutable.List()
})


export default class RemoveDialog extends React.Component {
  static propTypes = {
    order: PropTypes.number,
    edit: PropTypes.bool
  }

  constructor(props) {
    super(props)


    this.state = {
      open: false,
      entries: Immutable.List(),
      selected: -1,

      amountText: '',
      descriptionText: '',
      priceText: '',
      informationText: '',
      errorText: '',

      amountErrorText: '',
      descriptionErrorText: '',
      priceErrorText: ''
    }
  }

  componentDidMount() {
    DialogStore.addChangeListener(this._handleDisplay)
  }

  componentWillUnmount() {
    DialogStore.removeChangeListener(this._handleDisplay)
  }

  _isSelected = (index) => {
    return this.state.selected === index
  }

  _handleRowSelection = (selectedRow) => {
    this.setState({
      selected: selectedRow[0]
    })
  }

  _handleDisplay = () => {
    const open = DialogStore.isUpdateDialogOpen()

    if (open && this.props.edit && this.props.order !== -1 && this.props.order !== undefined) {
      const order = OrderStore.getOrder(this.props.order)
      this.setState({
        open: open,
        amountText: order.amount + '',
        descriptionText: order.description,
        priceText: order.price + '',
        entries: order.infos
      })
    } else {
      this.setState({
        open: open
      })
    }
  }

  _handleClose = () => {
    DialogActions.displayUpdateDialog(false)
  }

  _handleSubmit = () => {
    let error = false

    if (this.state.amountText === '') {
      error = true
      this.setState({
        amountErrorText: 'vorausgesetzt'
      })
    }

    if (this.state.descriptionText === '') {
      error = true
      this.setState({
        descriptionErrorText: 'vorausgesetzt'
      })
    }

    if (isNaN(parseInt(this.state.amountText))) {
      error = true
      this.setState({
        amountErrorText: 'Bitte gebe eine Zahl ein'
      })
    }

    if (this.state.priceText === '') {
      error = true
      this.setState({
        priceErrorText: 'vorausgesetzt'
      })
    }

    if (isNaN(parseInt(this.state.priceText))) {
      error = true
      this.setState({
        priceErrorText: 'Bitte gebe eine Zahl ein'
      })
    }

    if (error) {
      return
    }

    const orderRecord = new OrderRecord({
      'amount': parseInt(this.state.amountText),
      'description': this.state.descriptionText,
      'price': parseInt(this.state.priceText),
      'infos': this.state.entries
    })

    if (this.props.edit) {
      OrderActions.updateOrder(this.props.order, orderRecord)
    } else {
      OrderActions.addOrder(orderRecord)
    }
    DialogActions.displayUpdateDialog(false)

    this.setState({
      entries: Immutable.List(),
      selected: -1,

      amountText: '',
      descriptionText: '',
      priceText: '',
      informationText: '',
      errorText: ''
    })
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
      entries: this.state.entries.delete(this.state.selected),
      selected: -1
    })
  }

  _fillTable = () => {
    return this.state.entries.map((entry, index) =>
      <TableRow key={index} selected={this._isSelected(index)}>
        <TableRowColumn>{entry}</TableRowColumn>
      </TableRow>
    )
  }

  _handleAmountTextFieldChange = (e) => {
    this.setState({
      amountText: e.target.value,
      amountErrorText: ''
    })
  }

  _handleDescriptionTextFieldChange = (e) => {
    this.setState({
      descriptionText: e.target.value,
      descriptionErrorText: ''
    })
  }

  _handlePriceTextFieldChange = (e) => {
    this.setState({
      priceText: e.target.value,
      priceErrorText: ''
    })
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
    const {hsText, hsFont} = styles

    const actions = [
      <FlatButton
        key={0}
        label="Cancel"
        primary={true}
        onClick={this._handleClose}
      />,
      <FlatButton
        key={1}
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this._handleSubmit}
      />
    ]

    return (
      <div>
        <Dialog
          title="Bestellung"
          actions={actions}
          modal={false}
          open={this.state.open}
        >
          <TextField
            value={this.state.amountText}
            hintText="Menge"
            inputStyle={hsText}
            hintStyle={hsFont}
            onChange={this._handleAmountTextFieldChange}
            style={{
              width: '60px',
              marginLeft: '6px',
              marginRight: '6px'
            }}
            errorText={this.state.amountErrorText}
          />
          <TextField
            value={this.state.descriptionText}
            hintText="Bezeichnung"
            inputStyle={hsText}
            hintStyle={hsFont}
            floatingLabelText={'e.g. \'Basic Sponsoring\''}
            floatingLabelFixed={true}
            onChange={this._handleDescriptionTextFieldChange}
            style={{
              width: '450px',
              marginLeft: '6px',
              marginRight: '6px'
            }}
            errorText={this.state.descriptionErrorText}
          />
          <TextField
            value={this.state.priceText}
            hintText="Betrag (EUR)"
            inputStyle={hsText}
            hintStyle={hsFont}
            onChange={this._handlePriceTextFieldChange}
            style={{
              width: '100px',
              marginLeft: '6px',
              marginRight: '6px'
            }}
            errorText={this.state.priceErrorText}
          /><br/>

          <div className="pt4 pb4">
            <Table onRowSelection={this._handleRowSelection}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Zusätzliche Informationen</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody deselectOnClickaway={false}>
                {this._fillTable()}
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
    fontFamily: 'Source Sans Pro'
  },
  hsColor: {
    color: '#A63324'
  },
  hsText: {
    color: '#A63324',
    fontFamily: 'Source Sans Pro'
  }
}
