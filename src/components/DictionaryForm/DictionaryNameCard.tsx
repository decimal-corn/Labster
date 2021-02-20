import React from 'react'
import { Card, Form } from 'react-bootstrap'
import { Field } from 'react-final-form'

export const DictionaryNameCard = () => {
  return (
    <Card className='mb-3 border-primary'>
      <Card.Header className='bg-primary text-white'>
        Dictionary name
      </Card.Header>
      <Card.Body>
        <Field name='name'>
          {({ input, meta }) => (
            <Form.Group controlId='name'>
              <Form.Control type='text' {...input} />
              {meta.touched && meta.error && (
                <Form.Text className='text-danger'>{meta.error}</Form.Text>
              )}
            </Form.Group>
          )}
        </Field>
      </Card.Body>
    </Card>
  )
}
