import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
  CardText,
  CardHeader,
  CardImgOverlay,
  CardFooter,
  CardDeck,
  CardColumns,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";

import * as FaIcon from 'react-icons/fa'
import * as HiIcon from 'react-icons/hi'
import * as GiIcon from 'react-icons/gi'
import * as RiIcon from 'react-icons/ri'
import * as GrIcon from 'react-icons/gr'
import * as AiIcon from 'react-icons/ai'

// import images
import img4 from "../../assets/images/Core/maestroSplash.jpg";
import img5 from "../../assets/images/Core/prometheusSplash.jpg";
import img6 from "../../assets/images/Core/aresSplash.jpg";

import { Link } from "react-router-dom";

import classNames from "classnames";

//import Charts
import StackedColumnChart from "./StackedColumnChart";

//import action
import { getChartsData as onGetChartsData } from "../../store/actions";

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import SocialSource from "./SocialSource";
import ActivityComp from "./ActivityComp";
import TopCities from "./TopCities";
import LatestTranaction from "./LatestTranaction";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import CatRow
import CatRow from "../../components/MaestroCommons/CatRow";
import CatRowcr from "../../components/MaestroCommons/CatRowcr";

//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";

const Dashboard = props => {
  const [modal, setmodal] = useState(false);
  const [subscribemodal, setSubscribemodal] = useState(false);

  const { chartsData } = useSelector(state => ({
    chartsData: state.Dashboard.chartsData
  }));

  const reports = [
    { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
    { title: "Revenue", iconClass: "bx-archive-in", description: "$35, 723" },
    {
      title: "Average Price",
      iconClass: "bx-purchase-tag-alt",
      description: "$16.2",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setSubscribemodal(true);
    }, 2000);
  }, []);

  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("yearly");

  useEffect(() => {
    setPeriodData(chartsData);
  }, [chartsData]);

  const onChangeChartPeriod = pType => {
    setPeriodType(pType);
    dispatch(onGetChartsData(pType));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetChartsData("yearly"));
  }, [dispatch]);

  const [modal_xlarge, setmodal_xlarge] = useState(false);
  const [modal_fullscreen, setmodal_fullscreen] = useState(false);

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  function tog_xlarge() {
    setmodal_xlarge(!modal_xlarge);
    removeBodyCss();
  }

  function tog_fullscreen() {
    setmodal_fullscreen(!modal_fullscreen);
    removeBodyCss();
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Maestro - Home</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          {/*<Breadcrumbs title="Maestro Dashboard" breadcrumbItem="Welcome" />*/}
          <Row>
            <Col className="col-12 mb-4">
              <CardDeck className="card-deck-wrapper">
                <div className="card-group">
                  <Card className="mb-4 me-2">
                    <CardImg
                      top
                      className="img-fluid"
                      src={img4}
                      alt="TechKnow"
                    />
                    <CardBody>
                      <CardTitle className="mt-0">Maestro</CardTitle>
                      <CardText>
                      </CardText>
                      <CardText>
                        <small className="text-muted">
                          Putting the power of AI directly into the hands of decision makers.
                        </small>
                        <button
                          type="button"
                          onClick={() => {
                            tog_xlarge();
                          }}
                          className="btn btn-info fa FaPlay"
                          data-toggle="modal"
                        >
                          Play
                        </button>
                        <Modal
                          size="xl"
                          isOpen={modal_xlarge}
                          toggle={() => {
                            setmodal_xlarge();
                          }}
                          className="modal-xlarge"
                        >
                          <div className="modal-header">
                            <button
                              onClick={() => {
                                setmodal_xlarge(false);
                              }}
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body position-relative">
                            <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9">
                              <iframe
                                title="Meet Maestro"
                                className="embed-responsive-item"
                                src="https://web.microsoftstream.com/embed/video/2cf71ff2-4beb-4a64-8043-e8c2e6043f07?autoplay=false&showinfo=true"
                              />z
                            </div>
                          </div>
                        </Modal>
                      </CardText>
                    </CardBody>
                  </Card>
                  <Card className="mb-4">
                    <CardImg top className="img-fluid" src={img5} alt="CloudRedi" />
                    <CardBody>
                      <CardTitle className="mt-0">Prometheus</CardTitle>
                      <CardText>
                      </CardText>
                      <CardText>
                        <small className="text-muted">
                          Giving the power of Maestro to the people.
                        </small>
                      </CardText>
                    </CardBody>
                  </Card>
                  <Card className="mb-4 ms-2">
                    <CardImg top className="img-fluid" src={img6} alt="ares" />
                    <CardBody>
                      <CardTitle className="mt-0">Ares</CardTitle>
                      <CardText>
                      </CardText>
                      <CardText>
                        <small className="text-muted">
                          AI approach to securing business data.
                        </small>
                      </CardText>
                    </CardBody>
                  </Card>
                </div>
              </CardDeck>
            </Col>
          </Row>
          <Row>
            <h2 className="my-3">Maestro Catalogs</h2>
          </Row>
        </Container>
        <CatRow CatTitle="TechKnow" />

        <CatRowcr CatTitlecr="CloudRedi" />
        <Container fluid>

        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
