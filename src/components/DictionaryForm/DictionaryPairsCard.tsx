import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { FieldArray } from 'react-final-form-arrays'
import { Field } from 'react-final-form'
import { FieldValidator } from 'final-form'
import { DictionaryPair } from '../../types'

const validatePair: FieldValidator<DictionaryPair[]> = (pairs) => {
  // Returning array of objects, due to an error in 'final-form-arrays', which splits strings by a single letter
  const fromSet = new Set()
  return pairs.map((pair) => {
    if (!pair.from.trim() || !pair.to.trim()) {
      return { errorText: 'Both pair values should contain a value' }
    }
    if (fromSet.has(pair.from.trim())) {
      return {
        errorText: 'Pair contains identical "From" value',
      }
    } else {
      fromSet.add(pair.from.trim())
    }
  })
}

export const DictionaryPairsCard = () => {
  return (
    <Card className='border-primary'>
      <Card.Header className='bg-primary text-white'>
        Dictionary pairs
      </Card.Header>
      <Card.Body>
        <FieldArray name='data' validate={validatePair}>
          {({ fields, meta }) => (
            <Form.Group controlId='data'>
              <Row className='mb-2'>
                <Col>From:</Col>
                <Col>To:</Col>
                <Col lg={{ span: 1 }} />
              </Row>
              {fields.map((name, index) => (
                <div className='mb-2' key={name}>
                  <Row>
                    <Field name={`${name}.from`}>
                      {({ input }) => {
                        return (
                          <Col>
                            <Form.Control {...input} />
                          </Col>
                        )
                      }}
                    </Field>
                    <Field name={`${name}.to`}>
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
                  </Row>
                  {meta.touched && meta.error && meta.error[index] ? (
                    <Form.Text className='text-danger'>
                      {meta.error[index].errorText}
                    </Form.Text>
                  ) : null}
                </div>
              ))}
              <Button
                variant='primary'
                className='mt-3'
                onClick={() => fields.push({ from: '', to: '' })}
              >
                Add new pair
              </Button>
            </Form.Group>
          )}
        </FieldArray>
      </Card.Body>
    </Card>
  )
}
