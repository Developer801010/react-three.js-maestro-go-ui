import React from "react"
import MetaTags from 'react-meta-tags';
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const RCAA = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Route Cause Analysis & Action (RCAA) Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Maestro" breadcrumbItem="Route Cause Analysis & Action (RCAA)" />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default RCAA