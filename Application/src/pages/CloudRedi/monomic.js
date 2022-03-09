import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import axios from "axios"
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

//Import Breadcrumb
import {
  addMessage as onAddMessage,
  getChats as onGetChats,
  getContacts as onGetContacts,
  getGroups as onGetGroups,
  getMessages as onGetMessages,
} from "store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import applications from '../../common/data/monoMicAppList.json';
import paginationFactory, { PaginationListStandalone, PaginationProvider, SizePerPageDropdownStandalone } from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

// icon
import searchIcon from "../../assets/images/intelooSearch.svg";

const monoMic = props => {
  const dispatch = useDispatch();
  const [data, setData] = useState([])

  const { chats, groups, contacts, messages } = useSelector(state => ({
    chats: state.chat.chats,
    groups: state.chat.groups,
    contacts: state.chat.contacts,
    messages: state.chat.messages,
  }));

  const [messageBox, setMessageBox] = useState(null);
  // const Chat_Box_Username2 = "Maestro"
  const [currentRoomId, setCurrentRoomId] = useState(1);
  // eslint-disable-next-line no-unused-vars


  const columns = [{
    dataField: 'id',
    text: 'Id'
  }, {
    dataField: 'complexScore',
    text: 'ComplexScore(%)'
  }, {
    dataField: 'appName',
    text: 'Appname'
  }, {
    dataField: 'host',
    text: 'Host'
  }, {
    dataField: 'size',
    text: 'Size'
  }, {
    dataField: 'services',
    text: 'Services'
  }, {
    dataField: 'process',
    text: 'Process'
  }, {
    dataField: 'dataSets',
    text: 'DataSets'
  }, {
    dataField: 'dependent',
    text: 'Dependent'
  }];

  // Table Data
  const productData = applications[0].appList;

  const defaultSorted = [{
    dataField: 'id',
    order: 'asc'
  }];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: productData.length, // replace later with size(customers),
    custom: true,
  }

  useEffect(() => {
    dispatch(onGetChats());
    dispatch(onGetGroups());
    dispatch(onGetContacts());
    dispatch(onGetMessages(currentRoomId));
  }, [onGetChats, onGetGroups, onGetContacts, onGetMessages, currentRoomId]);

  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
    }
  };

  useEffect(() => {
    axios
      .get("https://maestro2go.azurewebsites.net/api/mono_2_micro", {
        headers: { "Access-Control-Allow-Origin": "*", },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="bread-bar">
        <span>Monolithic apps</span>
      </div>

      <div className="main-content mono-mic">
        <div className="intelBar">
          <Link className="link" to="/MonoMic/application">
            <span>
              <i className="fas fa-browser fa-fw"></i>

              Application
            </span>
          </Link>

          <Link className="link" to="/MonoMic/services">
            <span>
              <i className="fas fa-gear fa-fw"></i>

              Services
            </span>
          </Link>

          <Link className="link" to="/MonoMic/host">
            <span>
              <i className="fas fa-server fa-fw"></i>

              Host
            </span>
          </Link>

          <Link className="link" to="/MonoMic/database">
            <span>
              <i className="fas fa-database fa-fw"></i>

              Database
            </span>
          </Link>
        </div>

        <div className="data-source">
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <div className="source-title mb-3">
                    <div className="title-left">
                      <h3>Monolithic Application</h3>
                      <h4>Listing of monolithic applications within your current environment.</h4>
                    </div>

                    {/* <div className="title-right">
                      <h2 className="text-uppercase">Data sources</h2>
                    </div> */}
                  </div>

                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField='id'
                    columns={columns}
                    data={productData}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField='id'
                        columns={columns}
                        data={productData}
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row>
                              <Col md="4">
                                <div className="search-box me-2 mb-2 d-inline-block position-relative">
                                  <Search.SearchBar
                                    {...toolkitProps.searchProps}
                                  />
                                  <img src={searchIcon} className="search-icon" alt="search-icon" width="10`" />
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField={"id"}
                                    responsive
                                    bordered={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    classes={
                                      "table align-middle table-nowrap"
                                    }
                                    headerWrapperClasses={"thead-light"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                  />

                                </div>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="inner-custom-pagination d-flex">
                                <div className="text-md-right ms-auto">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </React.Fragment>
                        )
                        }
                      </ToolkitProvider>
                    )
                    }</PaginationProvider>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </ React.Fragment >
  );
}
export default monoMic;