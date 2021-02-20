import React from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { v4 as uuid } from 'uuid'
import arrayMutators from 'final-form-arrays'
import { Button, Card, Form } from 'react-bootstrap'
import { Form as FinalForm } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { pushDictionary, RootState } from '../../store/store'
import { getDictionary } from '../../store/selectors'
import { Link } from 'react-router-dom'
import { Dictionary } from '../../types'
import { ValidationErrors } from 'final-form'
import { DictionaryPairsCard } from './DictionaryPairsCard'
import { DictionaryNameCard } from './DictionaryNameCard'

const validate = (values: Dictionary) => {
  const validationResult: ValidationErrors = {}
  if (!values.name || !values.name.trim()) {
    validationResult.name = 'Name could not be empty'
  }
  return validationResult
}

export const DictionaryForm = () => {
  const match = useRouteMatch<{ id: string }>()
  const dispatch = useDispatch()
  const history = useHistory()
  let initialValues: Dictionary
  let id = match.params.id
  const dictionaryFromStore = useSelector((state: RootState) =>
    getDictionary(state, id),
  )

  if (match.params.id === undefined) {
    id = uuid()
    initialValues = {
      name: '',
      data: [{ from: '', to: '' }],
    }
  } else {
    if (!dictionaryFromStore) {
      history.push('/')
      return null
    }
    initialValues = dictionaryFromStore
  }

  return (
    <Card className='border-secondary'>
      <FinalForm
        onSubmit={(values) => {
          dispatch(pushDictionary({ dictionary: values, id }))
          history.push('/')
        }}
        validate={validate}
        mutators={{ ...arrayMutators }}
        initialValues={initialValues}
      >
        {({ handleSubmit, dirty }) => (
          <Form onSubmit={handleSubmit}>
            <Card.Header className='d-flex bg-secondary text-light'>
              <div className='flex-grow-1'>
                <Button variant='link' as={Link} to='/' className='text-white'>
                  {`< Back to overview`}
                </Button>
              </div>
              <Button type='submit' disabled={!dirty}>
                Save
              </Button>
            </Card.Header>

            <Card.Body className='bg-light'>
              <DictionaryNameCard />
              <DictionaryPairsCard />
            </Card.Body>
          </Form>
        )}
      </FinalForm>
    </Card>
  )
}
