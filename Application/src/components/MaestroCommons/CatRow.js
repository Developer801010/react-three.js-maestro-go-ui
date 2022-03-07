import React from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Container, Col } from "reactstrap"
import "./catrows.css"

// import images
import img1 from "../../assets/images/Core/autograph.jpg";
import img2 from "../../assets/images/Core/livegraph.jpg";
import img3 from "../../assets/images/Core/rcaa.jpg";
import img4 from "../../assets/images/Core/rao.jpg";


const CatRow = props => {
  return (
      <Row className="catRow">
          <h3 className="catTitle">{props.CatTitle}</h3>
          <div className="row_models">
            <img src={img1} className="row_model" />
            <img src={img2} className="row_model" />
            <img src={img3} className="row_model" />
            <img src={img4} className="row_model" />        
          </div>
      </Row>
  )
}

CatRow.propTypes = {
  CatTitle: PropTypes.string
}

export default CatRow