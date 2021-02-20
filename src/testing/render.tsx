import { render } from '@testing-library/react'
import React from 'react'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { rootReducer } from '../store/store'
import { configureStore } from '@reduxjs/toolkit'

export const renderComponent = (component: React.ReactElement, path = '/') => {
  const customHistory = createBrowserHistory()
  const store = configureStore({
    reducer: rootReducer,
  })
  render(
    <Router history={customHistory}>
      <Provider store={store}>{component}</Provider>
    </Router>,
  )
  customHistory.push(path)
  return { store, history: customHistory }
}
