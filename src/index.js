import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import App from './components/app/App'
import Main from './components/main/Main'

// Import stylesheet
require('./index.scss')

// Copy the index.html file
require('file-loader?name=[name].[ext]!./index.html')

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route component={Main}/>
    </App>
  </BrowserRouter>,
  document.getElementById('root')
)
