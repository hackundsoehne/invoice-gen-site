import React from "react";
const Immutable = require('immutable');

export default class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="main">
        <div className="main-hero">
          <h1 className="main-title">Invoice Generator</h1>
          <h4 className="main-subtitle">Erzeuge deine Rechnung einfach und schnell.</h4>
        </div>
        <div className="main-body">
          <div className="main-body-intro-message" style={{display: 'table'}}>
            <div style={{display: "table-cell", verticalAlign: "middle"}}>
              Test
            </div>
          </div>
        </div>
      </div>
    )
  }
}