import React from 'react'
import { useRouteMatch } from 'react-router'
import { v4 as uuid } from 'uuid'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Field, Form as FinalForm } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { push, RootState } from '../../store'
import { getDictionary } from '../../selectors'
import { Link } from 'react-router-dom'
import { Dictionary, DictionaryPair } from '../../types'
import { FieldValidator, ValidationErrors } from 'final-form'

const validate = (values: Dictionary) => {
  const validationResult: ValidationErrors = {}
  if (!values.name) {
    validationResult.name = 'Name could not be empty'
  }
  if (!values.data) {
    validationResult.data =
      'You should have at least one pair in the dictionary'
  }
  return validationResult
}

const validatePair: FieldValidator<DictionaryPair[]> = (pairs) => {
  return pairs.map((pair) => {
    if (!pair.left || !pair.right) {
      return 'Both pair values should contain a value'
    }
  })
}

export const DictionaryForm = () => {
  const match = useRouteMatch<{ id: string }>()
  const dispatch = useDispatch()
  let initialValues
  let id = match.params.id
  const dictionaryFromStore = useSelector((state: RootState) =>
    getDictionary(state, id),
  )

  if (match.params.id === undefined) {
    id = uuid()
    initialValues = {
      name: '',
      data: [{ left: '', right: '' }],
    }
  } else {
    initialValues = dictionaryFromStore
  }

  return (
    <FinalForm
      onSubmit={(values) => {
        dispatch(push({ dictionary: values, id }))
      }}
      validate={validate}
      mutators={{ ...arrayMutators }}
      initialValues={initialValues}
    >
      {({ handleSubmit, dirty }) => (
        <Form onSubmit={handleSubmit}>
          <Button variant='link' className='mr-5' as={Link} to='/'>
            {`< Back to overview`}
          </Button>
          <Button type='submit' disabled={!dirty}>
            Save
          </Button>

          <Field name='name'>
            {({ input, meta }) => (
              <Form.Group controlId='name'>
                <Form.Label>Dictionary name</Form.Label>
                <Form.Control type='text' {...input} />
                {meta.touched && meta.error && (
                  <Form.Text className='text-danger'>{meta.error}</Form.Text>
                )}
              </Form.Group>
            )}
          </Field>

          <FieldArray name='data' validate={validatePair}>
            {({ fields, meta }) => (
              <Form.Group controlId='data'>
                <Form.Label>Dictionary pairs</Form.Label>
                {fields.map((name, index) => (
                  <Row key={name} className='mb-2'>
                    <Field name={`${name}.left`}>
                      {({ input }) => {
                        return (
                          <Col>
                            <Form.Control {...input} />
                          </Col>
                        )
                      }}
                    </Field>
                    <Field name={`${name}.right`}>
                      {({ input }) => (
                        <Col>
                          <Form.Control {...input} />
                        </Col>
                      )}
                    </Field>
                    <Col lg={{ span: 1 }}>
                      {index > 0 && (
                        <Button
                          onClick={() => fields.remove(index)}
                          variant='danger'
                        >
                          Del
                        </Button>
                      )}
                    </Col>
                    {meta.error && meta.error[index] ? (
                      <Form.Text className='text-danger'>
                        {meta.error}
                      </Form.Text>
                    ) : null}
                  </Row>
                ))}
                <Button
                  variant='primary'
                  className='mt-3'
                  onClick={() => fields.push({ left: '', right: '' })}
                >
                  Add new pair
                </Button>
              </Form.Group>
            )}
          </FieldArray>
        </Form>
      )}
    </FinalForm>
  )
}
