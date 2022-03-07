import React from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Container, Col } from "reactstrap"
import "./catrows.css"

// import images
import img1 from "../../assets/images/small/img-1.jpg";
import img2 from "../../assets/images/small/img-2.jpg";
import img3 from "../../assets/images/small/img-3.jpg";
import img4 from "../../assets/images/small/img-4.jpg";
import img5 from "../../assets/images/small/img-5.jpg";
import img6 from "../../assets/images/small/img-6.jpg";


const CatRow = props => {
  return (
      <Row className="catRow">
          <h3 className="catTitle">{props.CatTitle}</h3>
          <div className="row_models">
            <img src={img1} className="row_model" />
            <img src={img2} className="row_model" />
            <img src={img3} className="row_model" />
            <img src={img4} className="row_model" />
            <img src={img5} className="row_model" />
            <img src={img6} className="row_model" />          
          </div>
      </Row>
  )
}

CatRow.propTypes = {
  CatTitle: PropTypes.string
}

export default CatRow