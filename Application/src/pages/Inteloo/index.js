import React from "react"
import MetaTags from 'react-meta-tags';
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import SearchBar from "../../components/inteloo/SearchBar"

const itlo = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Welcome to IntelOO</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Utility" breadcrumbItem="Starter Page" />
          <SearchBar />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default itlo
