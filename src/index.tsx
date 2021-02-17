import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { App } from './App'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

const customHistory = createBrowserHistory()

ReactDOM.render(
  <React.StrictMode>
    <Router history={customHistory}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)
