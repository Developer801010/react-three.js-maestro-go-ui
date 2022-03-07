import React from "react"
import MetaTags from 'react-meta-tags';
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const TechKnow = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>TechKnow Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="TechKnow Dashboard" breadcrumbItem="TechKnow" />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default TechKnow
