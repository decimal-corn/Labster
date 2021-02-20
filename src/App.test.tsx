import React from 'react'
import { screen } from '@testing-library/react'
import { App } from './App'
import { renderComponent } from './testing/render'
import userEvent from '@testing-library/user-event'

describe('Testing App component', () => {
  test('Should render app', () => {
    renderComponent(<App />)
    expect(screen.getByText('Menu')).toBeInTheDocument()
    expect(screen.getAllByText('Overview')).toHaveLength(2) // Menu and title
    expect(screen.getByText('Add new dictionary')).toBeInTheDocument()
  })

  test('Should move user using links', () => {
    const { history } = renderComponent(<App />)
    userEvent.click(screen.getByText('Add new dictionary'))
    expect(history.location.pathname).toEqual('/new')
    userEvent.click(screen.getByText('Overview'))
    expect(history.location.pathname).toEqual('/')
  })
})
