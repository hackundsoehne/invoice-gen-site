import React from "react";
import { TextField, DatePicker, DropDownMenu, MenuItem } from 'material-ui'
import areIntlLocalesSupported from 'intl-locales-supported'
const Immutable = require('immutable');

export default class Home extends React.Component {

  constructor(props) {
    super(props)

    let DateTimeFormat
    if (areIntlLocalesSupported(['de'])) {
      DateTimeFormat = global.Intl.DateTimeFormat;
    } else {
      const IntlPolyfill = require('intl');
      DateTimeFormat = IntlPolyfill.DateTimeFormat;
      require('intl/locale-data/jsonp/de');
    }

    this.state = {
      company_name: '',
      controlledDate: null,
      value: 1,
      DateTimeFormat: DateTimeFormat,
      locale: 'de'
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleChange = (event, date) => {
    this.setState({
      controlledDate: date,
    })
  }

  _handleLanguageChange = (event, index, value) => this.setState({value})

  render() {
    return (
      <div className="db pt3">
        <div className="dib pa4 v-top">
          <p className="bf">Zieldaten</p>
          <p className="bf f6 tl pt3" style={{marginBottom: '0'}}>Für:</p>
          <DropDownMenu value={this.state.value}
                        selectedMenuItemStyle={{color: '#A63324'}}
                        onChange={this._handleLanguageChange}>
            <MenuItem value={1} primaryText="Hack & Söhne" />
            <MenuItem value={2} primaryText="talKIT" />
          </DropDownMenu>
          <p className="bf f6 tl pt3" style={{marginBottom: '0'}}>Zielsprache:</p>
          <DropDownMenu value={this.state.value}
                        selectedMenuItemStyle={{color: '#A63324'}}
                        onChange={this._handleLanguageChange}>
            <MenuItem value={1} primaryText="Deutsch" />
            <MenuItem value={2} primaryText="Englisch" />
          </DropDownMenu>
          <br />
        </div>
        <div className="dib pa4">
          <p className="bf">Addresse des Unternehmens</p>
          <TextField
            hintText="Name des Unternehmens"
            inputStyle={{
              fontFamily: "Source Sans Pro",
              color: '#A63324'
            }}
            hintStyle={{
              fontFamily: "Source Sans Pro",
            }}
            errorText={this.state.company_name}
          /><br />
          <TextField
            hintText="z.H. von"
            inputStyle={{
              fontFamily: "Source Sans Pro",
              color: '#A63324'
            }}
            hintStyle={{
              fontFamily: "Source Sans Pro",
            }}
            errorText={this.state.company_name}
          /><br/>
          <TextField
            hintText="Adresse"
            inputStyle={{
              fontFamily: "Source Sans Pro",
              color: '#A63324'
            }}
            hintStyle={{
              fontFamily: "Source Sans Pro",
            }}
            errorText={this.state.company_name}
          /><br/>
          <div className="db">
            <TextField
              className="dib"
              hintText="PLZ"
              style={{
                width: '56px'
              }}
              inputStyle={{
                fontFamily: "Source Sans Pro",
                color: '#A63324'
              }}
              hintStyle={{
                fontFamily: "Source Sans Pro",
              }}
              errorText={this.state.company_name}
            />
            <TextField
              className="dib"
              hintText="Stadt"
              style={{
                width: '190px',
                paddingLeft: '6px'
              }}
              inputStyle={{
                fontFamily: "Source Sans Pro",
                color: '#A63324'
              }}
              hintStyle={{
                fontFamily: "Source Sans Pro",
              }}
              errorText={this.state.company_name}
            /><br />
          </div>
          <TextField
            hintText="Land (optional)"
            inputStyle={{
              fontFamily: "Source Sans Pro",
              color: '#A63324'
            }}
            hintStyle={{
              fontFamily: "Source Sans Pro",
            }}
            errorText={this.state.company_name}
          /><br />
        </div>
      <div className="dib pa4 v-top">
        <p className="bf">Daten</p>
        <DatePicker
          hintText="Rechungsdatum"
          hintStyle={{
            fontFamily: "Source Sans Pro",
          }}
          inputStyle={{
            fontFamily: "Source Sans Pro",
            color: '#A63324'
          }}
          value={this.state.controlledDate}
          onChange={this.handleChange}
          DateTimeFormat={this.state.DateTimeFormat}
          locale={this.state.locale}
        /><br />
        <DatePicker
          hintText="Kooperationsleistungsdatum"
          inputStyle={{
            fontFamily: "Source Sans Pro",
            color: '#A63324'
          }}
          hintStyle={{
            fontFamily: "Source Sans Pro",
          }}
          floatingLabelText={"Wann hast du die Zusage bekommen?"}
          floatingLabelFixed={true}
          floatingLabelStyle={{color: "#212121", width:'275px'}}
          errorText={this.state.company_name}
          DateTimeFormat={this.state.DateTimeFormat}
          locale={this.state.locale}
        /><br />
        <DatePicker
          hintText="Überweisungsdatum"
          inputStyle={{
            fontFamily: "Source Sans Pro",
            color: '#A63324'
          }}
          hintStyle={{
            fontFamily: "Source Sans Pro",
          }}
          floatingLabelText={"Bis wann muss das Geld überwiesen sein?"}
          floatingLabelFixed={true}
          floatingLabelStyle={{color: "#212121", width:'306px'}}
          errorText={this.state.company_name}
          DateTimeFormat={this.state.DateTimeFormat}
          locale={this.state.locale}
        /><br />
      </div>
      </div>
    )
  }
}