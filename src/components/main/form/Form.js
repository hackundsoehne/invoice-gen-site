import React from "react";
import { TextField, DatePicker } from 'material-ui'
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
    });
  };

  render() {
    return (
      <div className="db">
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