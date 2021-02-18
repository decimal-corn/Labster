import React from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Content } from './components/Content/Content'

export const App = () => {
  return (
    <Container fluid>
      <Row lg={12}>
        <Col lg={{ span: 2, offset: 2 }}>
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
        </Col>
        <Col lg={{ span: 7 }}>
          <Content />
        </Col>
      </Row>
    </Container>
  )
}
