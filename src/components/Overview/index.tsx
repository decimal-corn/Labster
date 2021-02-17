import React from 'react'
import { useSelector } from 'react-redux'
import { getDictionaries } from '../../selectors'
import { Card, Col, Container, Row, Table } from 'react-bootstrap'

export const Overview = () => {
  const dictionaries = useSelector(getDictionaries)
  return (
    <Container fluid>
      <Row>
        {Object.keys(dictionaries).map((key) => (
          <Col lg={4} key={key}>
            <Card>
              <Card.Body>
                <Card.Title>{dictionaries[key].name}</Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dictionaries[key].data.map((row) => (
                      <tr key={row.join()}>
                        <td>{row[0]}</td>
                        <td>{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Card.Link href='#'>Edit</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
