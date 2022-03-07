import { icon } from "leaflet"
import React from "react"
import { Container, Row, Col } from "reactstrap"
import * as faIcon from 'react-icons/fa';
import * as HiIcon from 'react-icons/hi'
import * as GiIcon from 'react-icons/gi'

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>{new Date().getFullYear()} © Maestro.</Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">
                Empowered by <GiIcon.GiOctopus className="intelify"/> Intelify
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
