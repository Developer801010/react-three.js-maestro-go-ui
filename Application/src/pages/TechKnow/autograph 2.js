import React from "react"
import MetaTags from 'react-meta-tags';
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const AutoGraph = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>AutoGraph Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Maestro" breadcrumbItem="AutoGraph" />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AutoGraph