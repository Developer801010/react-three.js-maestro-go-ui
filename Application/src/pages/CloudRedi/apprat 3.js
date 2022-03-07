import React from "react"
import MetaTags from 'react-meta-tags';
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const AppRat = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>App Rationalization Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Maestro" breadcrumbItem="App Ratationalization" />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AppRat