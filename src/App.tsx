import React from 'react'
import { Card, Col, Container, Nav, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Content } from './components/Content'

export const App = () => {
  return (
    <Container fluid className='mt-3'>
      <Row lg={12}>
        <Col lg={{ span: 2, offset: 1 }}>
          <Card className='border-secondary'>
            <Card.Header className='bg-secondary text-white'>Menu</Card.Header>
            <Card.Body>
              <Nav defaultActiveKey='/' className='flex-column'>
                <Nav.Item>
                  <Nav.Link as={Link} eventKey='overview' to='/'>
                    Overview
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} eventKey='new' to='/new'>
                    Add new dictionary
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={{ span: 7, offset: 1 }}>
          <Content />
        </Col>
      </Row>
    </Container>
  )
}
