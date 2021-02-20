import { renderComponent } from '../../testing/render'
import { screen } from '@testing-library/react'
import React from 'react'
import { App } from '../../App'
import {
  pushTestDictionary,
  TEST_DICTIONARY_1,
  TEST_DICTIONARY_1_ID,
} from '../../testing/dictionary'
import userEvent from '@testing-library/user-event'

describe('Testing DictionaryForm component', () => {
  test('Should render empty form', () => {
    renderComponent(<App />, '/new')
    expect(screen.getByText('Dictionary name')).toBeInTheDocument()
    expect(screen.getByText('Dictionary pairs')).toBeInTheDocument()
    expect(screen.getAllByTestId('dictionary-form-pair-testid')).toHaveLength(1)
    expect(screen.getByText('Add new pair')).toBeInTheDocument()
  })

  test('Should be able to add and remove pairs except the first one', () => {
    renderComponent(<App />, '/new')
    userEvent.click(screen.getByText('Add new pair'))
    expect(screen.getAllByTestId('dictionary-form-pair-testid')).toHaveLength(2)
    expect(screen.getAllByText('Del')).toHaveLength(1)
    userEvent.click(screen.getByText('Del'))
    expect(screen.getAllByTestId('dictionary-form-pair-testid')).toHaveLength(1)
    expect(screen.queryAllByText('Del')).toHaveLength(0)
  })

  test('Should render a form with fields from dictionary', () => {
    const { store, history } = renderComponent(<App />)
    pushTestDictionary(store, TEST_DICTIONARY_1, TEST_DICTIONARY_1_ID)
    history.push(`/edit/${TEST_DICTIONARY_1_ID}`)

    expect(screen.getByDisplayValue(TEST_DICTIONARY_1.name)).toBeInTheDocument()
    expect(
      screen.getByDisplayValue(TEST_DICTIONARY_1.data[0].from),
    ).toBeInTheDocument()
    expect(
      screen.getByDisplayValue(TEST_DICTIONARY_1.data[0].to),
    ).toBeInTheDocument()
    expect(screen.getAllByTestId('dictionary-form-pair-testid')).toHaveLength(1)
    expect(screen.getByText('Add new pair')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeDisabled()
  })

  test('Should edit an existing dictionary', () => {
    const { store, history } = renderComponent(<App />)
    pushTestDictionary(store, TEST_DICTIONARY_1, TEST_DICTIONARY_1_ID)
    history.push(`/edit/${TEST_DICTIONARY_1_ID}`)
    const nameField = screen.getByDisplayValue(TEST_DICTIONARY_1.name)
    userEvent.clear(nameField)
    userEvent.type(nameField, 'New name')
    const fromField = screen.getByDisplayValue(TEST_DICTIONARY_1.data[0].from)
    userEvent.clear(fromField)
    userEvent.type(fromField, 'New from')
    const toField = screen.getByDisplayValue(TEST_DICTIONARY_1.data[0].to)
    userEvent.clear(toField)
    userEvent.type(toField, 'New to')
    const saveButton = screen.getByText('Save')
    expect(saveButton).not.toBeDisabled()
    userEvent.click(saveButton)
    expect(history.location.pathname).toEqual('/')
    expect(store.getState()).toEqual({
      dictionaries: {
        [TEST_DICTIONARY_1_ID]: {
          name: 'New name',
          data: [{ from: 'New from', to: 'New to' }],
        },
      },
    })
  })

  test('Should catch invalid form values', () => {
    const { store, history } = renderComponent(<App />)
    pushTestDictionary(store, TEST_DICTIONARY_1, TEST_DICTIONARY_1_ID)
    history.push(`/edit/${TEST_DICTIONARY_1_ID}`)
    const saveButton = screen.getByText('Save')

    const nameField = screen.getByDisplayValue(TEST_DICTIONARY_1.name)
    userEvent.clear(nameField)
    userEvent.click(saveButton)
    expect(screen.getByText('Name could not be empty'))
    userEvent.type(nameField, 'New name')

    const fromField = screen.getByDisplayValue(TEST_DICTIONARY_1.data[0].from)
    userEvent.clear(fromField)
    userEvent.click(saveButton)
    expect(screen.getByText('Both pair fields should contain a value'))
    userEvent.type(fromField, 'New from')

    const toField = screen.getByDisplayValue(TEST_DICTIONARY_1.data[0].to)
    userEvent.clear(toField)
    userEvent.click(saveButton)
    expect(screen.getByText('Both pair fields should contain a value'))
    userEvent.type(toField, 'New to')

    userEvent.click(screen.getByText('Add new pair'))

    const fromFields = screen.getAllByTestId('dictionary-form-from-input')
    const toFields = screen.getAllByTestId('dictionary-form-to-input')

    // Full identity case
    userEvent.type(fromFields[1], 'New from')
    userEvent.type(toFields[1], 'New to')
    userEvent.click(saveButton)
    expect(screen.getByText('Pair contains identical "From" value'))

    // Fork case
    userEvent.clear(toFields[1])
    userEvent.type(toFields[1], 'Value')
    userEvent.click(saveButton)
    expect(screen.getByText('Pair contains identical "From" value'))

    userEvent.type(fromFields[1], '*')
    userEvent.click(saveButton)
    expect(history.location.pathname).toEqual('/')
    expect(store.getState()).toEqual({
      dictionaries: {
        [TEST_DICTIONARY_1_ID]: {
          name: 'New name',
          data: [
            { from: 'New from', to: 'New to' },
            { from: 'New from*', to: 'Value' },
          ],
        },
      },
    })
  })
})
