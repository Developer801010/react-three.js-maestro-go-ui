import React from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Container, Col } from "reactstrap"
import "./catrows.css"

// import images
import img5 from "../../assets/images/Core/monomic.jpg";
import img6 from "../../assets/images/Core/appcon.jpg";
import img7 from "../../assets/images/Core/apprat.jpg";
import img8 from "../../assets/images/Core/hardcloud.jpg";


const CatRowcr = props => {
  return (
      <Row className="catRow">
          <h3 className="catTitle">{props.CatTitlecr}</h3>
          <div className="row_models">
            <img src={img5} className="row_model" />
            <img src={img6} className="row_model" />
            <img src={img7} className="row_model" />
            <img src={img8} className="row_model" />        
          </div>
      </Row>
  )
}

CatRowcr.propTypes = {
  CatTitlecr: PropTypes.string
}

export default CatRowcr