import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDictionaries } from '../../selectors'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { remove } from '../../store'
import { Link } from 'react-router-dom'

export const Overview = () => {
  const dictionaries = useSelector(getDictionaries)
  const dispatch = useDispatch()

  const onDictionaryRemove = useCallback((id: string) => {
    dispatch(remove({ id }))
  }, [])

  return (
    <Container fluid>
      <Row>
        {Object.keys(dictionaries).map((key) => (
          <Col lg={4} key={key}>
            <Card>
              <Card.Header as='h5'>{dictionaries[key].name}</Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dictionaries[key].data.map((row) => (
                      <tr key={row.left + row.right}>
                        <td>{row.left}</td>
                        <td>{row.right}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant='primary'
                  className='mr-2'
                  as={Link}
                  to={`/edit/${key}`}
                >
                  Edit
                </Button>
                <Button
                  variant='danger'
                  onClick={() => onDictionaryRemove(key)}
                >
                  Remove
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
