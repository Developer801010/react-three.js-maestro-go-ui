import React from "react"
import MetaTags from 'react-meta-tags';
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const RouteOpt = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Route Analysis & Optimization (RAO) Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Maestro" breadcrumbItem="Route Analysis & Optimization (RAO)" />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default RouteOpt