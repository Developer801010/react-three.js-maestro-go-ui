import React from "react"
import MetaTags from 'react-meta-tags';
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const CloudRedi = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>CloudRedi Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Maestro" breadcrumbItem="CloudRedi" />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default CloudRedi
