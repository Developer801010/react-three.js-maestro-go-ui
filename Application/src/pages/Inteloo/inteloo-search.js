import React, { useState, useEffect } from "react";
import IntelooDataService from "../../intelooServices/service_inteloo";
import MetaTags from 'react-meta-tags';
import PropTypes from 'prop-types';
import axios from "axios"
import {
  Button,
  ButtonToolbar,
  ButtonGroup,
  Input,
  InputGroup,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container
} from "reactstrap";
import SearchBar from "../../components/inteloo/SearchBar"
import CardList from "../../components/inteloo/CardList";

import Api from "../../components/Api/Api";

const IntelooSearch = () => {

  const [state, setState] = useState({
    results: [1]
  });

  const onSearch = async (text) => {
    const results = await Api.get("", {
      params: { },
    });

    setState(prevState => {
      return { ...prevState, results: results }
    })
  };
  return (
    <React.Fragment>
        <Container fluid className="intelooMain">
          <Row>
            <div>

              <SearchBar onSearch={onSearch} />
              <CardList results={state.results} />

            </div>
          </Row>
        </Container>
      </ React.Fragment>

  );


};
export default IntelooSearch
