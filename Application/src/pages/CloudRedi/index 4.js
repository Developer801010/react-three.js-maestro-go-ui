import React from 'react';
import MetaTags from 'react-meta-tags';  // Added Meta Tag npm Package
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

class cloudredi extends Component {
    render() {
        return (
            <>
                <div className="page-content">
                    <MetaTags>
                    <title>New Page | Skote - React Admin & Dashboard Template</title>
                    </MetaTags>
                    <Container fluid={true}>
                        <Breadcrumbs title="CloudRedi" breadcrumbItem="Cloud Redi" />
                        
                            //write Html code or structure

                    </Container>
                </div>
            </>
        );
    }
}

export default cloudredi;