import React from "react"
import MetaTags from 'react-meta-tags';
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const HardCloud = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Hardware to Cloud Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Maestro" breadcrumbItem="Hardware to Cloud" />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default HardCloud