import React from 'react'
import { screen } from '@testing-library/react'
import { renderComponent } from '../../testing/render'
import userEvent from '@testing-library/user-event'
import {
  pushDictionary,
  TEST_DICTIONARY_1,
  TEST_DICTIONARY_1_ID,
} from '../../testing/dictionary'
import { App } from '../../App'

describe('Testing Overview component', () => {
  test('Should tell user if the store is empty and suggest creation of a dictionary', () => {
    renderComponent(<App />)
    expect(screen.getByText('There are no dictonaries')).toBeInTheDocument()
  })

  test('Should display dictionaries', async () => {
    const { store } = renderComponent(<App />)
    pushDictionary(store, TEST_DICTIONARY_1, TEST_DICTIONARY_1_ID)
    expect(
      screen.queryByText('There are no dictonaries'),
    ).not.toBeInTheDocument()
    expect(screen.getByText(TEST_DICTIONARY_1.name)).toBeInTheDocument()
    expect(screen.getByText(TEST_DICTIONARY_1.data[0].from)).toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })

  test('Should display confirmation before removing and remove dictionary after confirmation', async () => {
    const { store } = renderComponent(<App />)
    pushDictionary(store, TEST_DICTIONARY_1, TEST_DICTIONARY_1_ID)
    const delButton = screen.getByText('Remove')
    userEvent.click(delButton)
    expect(
      screen.getByText(
        `Confirm removing the "${TEST_DICTIONARY_1.name}" dictionary`,
      ),
    )
    const confirmDelButton = screen.getAllByText('Remove')[1]
    userEvent.click(confirmDelButton)
    expect(screen.getByText('There are no dictonaries')).toBeInTheDocument()
    expect(store.getState()).toEqual({ dictionaries: {} })
  })

  test('Should display confirmation before removing and NOT remove dictionary on cancel', async () => {
    const { store } = renderComponent(<App />)
    pushDictionary(store, TEST_DICTIONARY_1, TEST_DICTIONARY_1_ID)
    const delButton = screen.getByText('Remove')
    userEvent.click(delButton)
    expect(
      screen.getByText(
        `Confirm removing the "${TEST_DICTIONARY_1.name}" dictionary`,
      ),
    )
    const cancelButton = screen.getByText('Cancel')
    userEvent.click(cancelButton)
    expect(screen.getByText(TEST_DICTIONARY_1.name)).toBeInTheDocument()
  })

  test('Should open editing page on dictionary edit', async () => {
    const { store, history } = renderComponent(<App />)
    pushDictionary(store, TEST_DICTIONARY_1, TEST_DICTIONARY_1_ID)
    const editButton = screen.getByText('Edit')
    userEvent.click(editButton)
    expect(history.location.pathname).toEqual(`/edit/${TEST_DICTIONARY_1_ID}`)
  })
})
