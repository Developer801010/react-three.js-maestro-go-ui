import React from "react"
import MetaTags from 'react-meta-tags';
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const LiveGraph = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>LiveGraph Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Maestro" breadcrumbItem="LiveGraph" />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default LiveGraph