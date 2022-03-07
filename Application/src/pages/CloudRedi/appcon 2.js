import React from "react"
import MetaTags from 'react-meta-tags';
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const AppCon = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>App Containerization Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Maestro" breadcrumbItem="App Containerization" />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AppCon