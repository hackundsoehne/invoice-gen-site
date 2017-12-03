import React from "react";
import {DatePicker, DropDownMenu, MenuItem, TextField} from 'material-ui'
import areIntlLocalesSupported from 'intl-locales-supported'

const Immutable = require('immutable');

export default class Home extends React.Component {

  /* TODO: Localize & internationalize */
  constructor(props) {
    super(props);

    let DateTimeFormat;
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
      language: 0,
      DateTimeFormat: DateTimeFormat,
      locale: 'de',
      source: 0,
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
  };

  _handleLanguageChange = (event, index, value) => this.setState({language: value});

  _handleSourceChange = (event, index, value) => this.setState({source: value});


  render() {
    const {hsText, hsFont, hsColor} = styles;
    return (
      <div className
             ="db pt3">
        <div className="dib pa4 v-top">
          <p className="bf">Zieldaten</p>
          <p className="bf f6 tl pt3" style={{marginBottom: '0'}}>Für:</p>
          <DropDownMenu value={this.state.source}
                        style={{hsColor, width: 200 /* TODO adapt to largest item */}}
                        selectedMenuItemStyle={hsColor}
                        onChange={this._handleSourceChange}>
            <MenuItem value={0} primaryText="Hack & Söhne"/>
            <MenuItem value={1} primaryText="talKIT"/>
          </DropDownMenu>
          <p className="bf f6 tl pt3" style={{marginBottom: '0'}}>Zielsprache:</p>
          <DropDownMenu value={this.state.language}
                        style={{hsColor, width: 200 /* TODO adapt to largest item */}}
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
            hintText="Name des Unternehmens"
            inputStyle={hsText}
            hintStyle={hsFont}
            errorText={this.state.company_name}
          /><br/>
          <TextField
            hintText="z.H. von"
            inputStyle={hsText}
            hintStyle={hsFont}
            errorText={this.state.company_name}
          /><br/>
          <TextField
            hintText="Adresse"
            inputStyle={hsText}
            hintStyle={hsFont}
            errorText={this.state.company_name}
          /><br/>
          <div className="db">
            <TextField
              className="dib"
              hintText="PLZ"
              style={{
                width: '56px'
              }}
              inputStyle={hsText}
              hintStyle={hsFont}
              errorText={this.state.company_name}
            />
            <TextField
              className="dib"
              hintText="Stadt"
              style={{
                width: '190px',
                paddingLeft: '6px'
              }}
              inputStyle={hsText}
              hintStyle={hsFont}
              errorText={this.state.company_name}
            /><br/>
          </div>
          <TextField
            hintText="Land (optional)"
            inputStyle={hsText}
            hintStyle={hsFont}
            errorText={this.state.company_name}
          /><br/>
        </div>
        <div className="dib pa4 v-top">
          <p className="bf">Daten</p>
          <DatePicker
            hintText="Rechungsdatum"
            inputStyle={hsText}
            hintStyle={hsFont}
            value={this.state.controlledDate}
            onChange={this.handleChange}
            DateTimeFormat={this.state.DateTimeFormat}
            locale={this.state.locale}
          /><br/>
          <DatePicker
            hintText="Kooperationsleistungsdatum"
            inputStyle={hsText}
            hintStyle={hsFont}
            floatingLabelText={"Wann hast du die Zusage bekommen?"}
            floatingLabelFixed={true}
            floatingLabelStyle={{color: "#212121", width: '275px'}}
            errorText={this.state.company_name}
            DateTimeFormat={this.state.DateTimeFormat}
            locale={this.state.locale}
          /><br/>
          <DatePicker
            hintText="Überweisungsdatum"
            inputStyle={hsText}
            hintStyle={hsFont}
            floatingLabelText={"Bis wann muss das Geld überwiesen sein?"}
            floatingLabelFixed={true}
            floatingLabelStyle={{color: "#212121", width: '306px'}}
            errorText={this.state.company_name}
            DateTimeFormat={this.state.DateTimeFormat}
            locale={this.state.locale}
          /><br/>
        </div>
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