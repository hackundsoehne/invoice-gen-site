import React from 'react'
import {DatePicker, DropDownMenu, MenuItem, TextField, RaisedButton} from 'material-ui'
import areIntlLocalesSupported from 'intl-locales-supported'
import Table from '../table/Table'
import OrderStore from '../../../stores/orderStore'
import Immutable from 'immutable'
import fetch from 'isomorphic-fetch'

const FormRecord = Immutable.Record({
  'target': '',
  'locale': '',
  'company': '',
  'person': '',
  'address': '',
  'zip': '',
  'city': '',
  'country': '',
  'invoiceDate': '',
  'dealDate': '',
  'transferDeadline': '',
  'orders': Immutable.List()
})

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    let DateTimeFormat
    if (areIntlLocalesSupported(['de'])) {
      DateTimeFormat = global.Intl.DateTimeFormat
    } else {
      const IntlPolyfill = require('intl')
      DateTimeFormat = IntlPolyfill.DateTimeFormat
      require('intl/locale-data/jsonp/de')
    }

    this.state = {
      language: 0,
      DateTimeFormat: DateTimeFormat,
      locale: 'de',
      source: 0,
      errorText: '',

      invoiceDate: null,
      dealDate: null,
      transferDeadline: null,
      companyText: '',
      personText: '',
      addressText: '',
      zipText: '',
      cityText: '',
      countryText: '',

      invoiceDateError: '',
      dealDateError: '',
      transferDeadlineError: '',
      companyErrorText: '',
      personErrorText: '',
      addressErrorText: '',
      zipErrorText: '',
      cityErrorText: '',
      countryErrorText: ''
    }
  }

  componentDidMount() {
    OrderStore.addChangeListener(this._handleOrderChange)
  }

  componentWillUnmount() {
    OrderStore.removeChangeListener(this._handleOrderChange)
  }

  _handleOrderChange = () => {
    if (OrderStore.getOrders().size > 0) {
      this.setState({
        errorText: ''
      })
    }
  }

  _handleLanguageChange = (event, index, value) => {
    let locale = 'de'
    if (value === 1) {
      locale = 'en'
    }

    this.setState({
      locale: locale,
      language: value
    })
  }

  _handleSubmit = () => {
    let error = false

    if (this.state.companyText === '') {
      error = true
      this.setState({
        companyErrorText: 'vorausgesetzt'
      })
    }

    if (this.state.personText === '') {
      error = true
      this.setState({
        personErrorText: 'vorausgesetzt'
      })
    }

    if (this.state.addressText === '') {
      error = true
      this.setState({
        addressErrorText: 'vorausgesetzt'
      })
    }

    if (this.state.zipText === '') {
      error = true
      this.setState({
        zipErrorText: 'vorausgesetzt'
      })
    }

    if (this.state.cityText === '') {
      error = true
      this.setState({
        cityErrorText: 'vorausgesetzt'
      })
    }

    if (this.state.countryText === '') {
      error = true
      this.setState({
        countryErrorText: 'vorausgesetzt'
      })
    }

    if (this.state.invoiceDate === null) {
      error = true
      this.setState({
        invoiceDateError: 'vorausgesetzt'
      })
    }

    if (this.state.dealDate === null) {
      error = true
      this.setState({
        dealDateError: 'vorausgesetzt'
      })
    }

    if (this.state.transferDeadline === null) {
      error = true
      this.setState({
        transferDeadlineError: 'vorausgesetzt'
      })
    }

    let orders = OrderStore.getOrders()

    if (orders.size === 0) {
      error = true
      this.setState({
        errorText: 'Bitte füge mindestens eine Bestellung hinzu.'
      })
    }

    if (error) {
      return
    }

    const formRecord = new FormRecord({
      'target': parseInt(this.state.source),
      'locale': this.state.locale,
      'company': this.state.companyText,
      'person': this.state.personText,
      'address': this.state.addressText,
      'zip': this.state.zipText,
      'city': this.state.cityText,
      'country': this.state.countryText,
      'invoiceDate': this.state.invoiceDate.toDateString(),
      'dealDate': this.state.dealDate.toDateString(),
      'transferDeadline': this.state.transferDeadline.toDateString(),
      'orders': orders
    })

    console.log(formRecord.toJS())

    fetch('http://localhost:3001/invoice', {
      method: 'POST',
      body: JSON.stringify(formRecord.toJSON())
    })

    // let xmlhttp = new XMLHttpRequest()
    // xmlhttp.open('POST', 'http://localhost:3001/invoice')
    // xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    //
    // xmlhttp.onreadystatechange = () => {
    //   if (xmlhttp.readyState === XMLHttpRequest.DONE) {
    //     console.log(xmlhttp.response)
    //   }
    // }

    // xmlhttp.send(JSON.stringify(formRecord.toJSON()))
  }

  _handleSourceChange = (event, index, value) => this.setState({source: value});

  _handleInvoiceDateChange = (event, date) => this.setState({invoiceDate: date, invoiceDateError: ''});

  _handleDealDateChange = (event, date) => this.setState({dealDate: date, dealDateError: ''});

  _handleTransferDeadlineChange = (event, date) => this.setState({transferDeadline: date, transferDeadlineError: ''});

  _handleCompanyTextChange = (e) => this.setState({companyText: e.target.value, companyErrorText: ''});

  _handlePersonTextChange = (e) => this.setState({personText: e.target.value, personErrorText: ''});

  _handleAddressTextChange = (e) => this.setState({addressText: e.target.value, addressErrorText: ''});

  _handleZipTextChange = (e) => this.setState({zipText: e.target.value, zipErrorText: ''});

  _handleCityTextChange = (e) => this.setState({cityText: e.target.value, cityErrorText: ''});

  _handleCountryTextChange = (e) => this.setState({countryText: e.target.value, countryErrorText: ''});

  render() {
    const {hsText, hsFont, hsColor} = styles

    return (
      <div>
        <div className="db pt3">
          <div className="dib pa4 v-top">
            <p className="bf">Zieldaten</p>
            <p className="bf f6 tl pt3" style={{marginBottom: '0'}}>Für:</p>
            <DropDownMenu value={this.state.source}
                          style={{hsColor, width: 200}}
                          selectedMenuItemStyle={hsColor}
                          onChange={this._handleSourceChange}>
              <MenuItem value={0} primaryText="Hack & Söhne"/>
              <MenuItem value={1} primaryText="talKIT"/>
            </DropDownMenu>
            <p className="bf f6 tl pt3" style={{marginBottom: '0'}}>Zielsprache:</p>
            <DropDownMenu value={this.state.language}
                          style={{hsColor, width: 200}}
                          selectedMenuItemStyle={hsColor}
                          onChange={this._handleLanguageChange}>
              <MenuItem value={0} primaryText="Deutsch"/>
              <MenuItem value={1} primaryText="Englisch"/>
            </DropDownMenu>
            <br/>
          </div>
          <div className="dib pa4">
            <p className="bf">Addresse des Unternehmens</p>
            <TextField
              value={this.state.companyText}
              hintText="Name des Unternehmens"
              inputStyle={hsText}
              hintStyle={hsFont}
              onChange={this._handleCompanyTextChange}
              errorText={this.state.companyErrorText}
            /><br/>
            <TextField
              value={this.state.personText} hintText="z.H. von"
              inputStyle={hsText}
              hintStyle={hsFont}
              onChange={this._handlePersonTextChange}
              errorText={this.state.personErrorText}
            /><br/>
            <TextField
              value={this.state.addressText}
              hintText="Adresse"
              inputStyle={hsText}
              hintStyle={hsFont}
              onChange={this._handleAddressTextChange}
              errorText={this.state.addressErrorText}
            /><br/>
            <div className="db">
              <TextField
                value={this.state.zipText}
                className="dib"
                hintText="PLZ"
                style={{
                  width: '56px'
                }}
                inputStyle={hsText}
                hintStyle={hsFont}
                onChange={this._handleZipTextChange}
                errorText={this.state.zipErrorText}
              />
              <TextField
                value={this.state.cityText}
                className="dib"
                hintText="Stadt"
                style={{
                  width: '190px',
                  paddingLeft: '6px'
                }}
                inputStyle={hsText}
                hintStyle={hsFont}
                onChange={this._handleCityTextChange}
                errorText={this.state.cityErrorText}
              /><br/>
            </div>
            <TextField
              value={this.state.countryText}
              hintText="Land"
              inputStyle={hsText}
              hintStyle={hsFont}
              onChange={this._handleCountryTextChange}
              errorText={this.state.countryErrorText}
            /><br/>
          </div>
          <div className="dib pa4 v-top">
            <p className="bf">Daten</p>
            <DatePicker
              hintText="Rechungsdatum"
              inputStyle={hsText}
              hintStyle={hsFont}
              value={this.state.invoiceDate}
              errorText={this.state.invoiceDateError}
              onChange={this._handleInvoiceDateChange}
              DateTimeFormat={this.state.DateTimeFormat}
              locale={this.state.locale}
            /><br/>
            <DatePicker
              hintText="Kooperationsleistungsdatum"
              inputStyle={hsText}
              hintStyle={hsFont}
              floatingLabelText={'Wann hast du die Zusage bekommen?'}
              floatingLabelFixed={true}
              floatingLabelStyle={{color: '#212121', width: '275px'}}
              value={this.state.dealDate}
              errorText={this.state.dealDateError}
              onChange={this._handleDealDateChange}
              DateTimeFormat={this.state.DateTimeFormat}
              locale={this.state.locale}
            /><br/>
            <DatePicker
              hintText="Überweisungsdatum"
              inputStyle={hsText}
              hintStyle={hsFont}
              floatingLabelText={'Bis wann muss das Geld überwiesen sein?'}
              floatingLabelFixed={true}
              floatingLabelStyle={{color: '#212121', width: '306px'}}
              value={this.state.transferDeadline}
              errorText={this.state.transferDeadlineError}
              onChange={this._handleTransferDeadlineChange}
              DateTimeFormat={this.state.DateTimeFormat}
              locale={this.state.locale}
            /><br/>
          </div>
        </div>
        <Table/>
        <p className="db pa4 pt5 tc f6" style={{'color': 'rgb(244, 67, 54)'}}>{this.state.errorText}</p>
        <div className="db pa4 pb5">
          <RaisedButton label="Rechnung Erstellen"
                        primary={true}
                        onClick={this._handleSubmit}/>
        </div>
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
