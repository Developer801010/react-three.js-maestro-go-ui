import React from "react"
import MetaTags from 'react-meta-tags';
import { Link } from "react-router-dom";
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const monoMic = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Mono to Micro Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Maestro" breadcrumbItem="Mono to Micro" />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default monoMic