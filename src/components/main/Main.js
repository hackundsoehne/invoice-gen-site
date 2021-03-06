import React from 'react'
import Form from './form/Form'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="main">
        <div className="">
          <h1 className="pt5 f1 white tc hf">Rechnungs Generator</h1>
          <h4 className="pt3 f5 white tc hf">Erzeuge deine Rechnung einfach und schnell.</h4>
        </div>
        <div className="pt4">
          <div className="main-body-intro-message" style={{display: 'table'}}>
            <div className='bf' style={{display: 'table-cell', verticalAlign: 'middle'}}>
              <Form/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
