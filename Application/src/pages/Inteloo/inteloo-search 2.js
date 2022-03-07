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

const IntelooSearch = props => {
  const initialIntelooState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentInteloo, setCurrentInteloo] = useState(initialIntelooState);
  const [message, setMessage] = useState("");
  const getInteloo = id => {
    IntelooDataService.get(id)
      .then(response => {
        setCurrentInteloo(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getInteloo(props.match.params.id);
  }, [props.match.params.id]);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentInteloo({ ...currentInteloo, [name]: value });
  };
  const updatePublished = status => {
    var data = {
      id: currentInteloo.id,
      title: currentInteloo.title,
      description: currentInteloo.description,
      published: status
    };
    IntelooDataService.update(currentInteloo.id, data)
      .then(response => {
        setCurrentInteloo({ ...currentInteloo, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const updateInteloo = () => {
    IntelooDataService.update(currentInteloo.id, currentInteloo)
      .then(response => {
        console.log(response.data);
        setMessage("The Inteloo was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };
  const deleteInteloo = () => {
    IntelooDataService.remove(currentInteloo.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/inteloo-search");
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <React.Fragment>
        <Container fluid className="intelooMain">
          <Row>
        <div>
            {currentInteloo ? (
                <div className="edit-form">
                <h4>Inteloo</h4>
                <form>
                    <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={currentInteloo.title}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={currentInteloo.description}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="form-group">
                    <label>
                        <strong>Status:</strong>
                    </label>
                    {currentInteloo.published ? "Published" : "Pending"}
                    </div>
                </form>
                {currentInteloo.published ? (
                   <Button
                    className="me-3"
                    onClick={() => updatePublished(false)}
                    >
                    UnPublish
                    </Button>
                ) : (
                    <Button
                    className="me-3"
                    onClick={() => updatePublished(true)}
                    >
                    Publish
                    </Button>
                )}
                <Button onClick={deleteInteloo}>
                    Delete
                </Button>
                <Button
                    className="ms-3"
                    type="submit"
                    color="primary"
                    onClick={updateInteloo}
                >
                    Update
                </Button>
                <p>{message}</p>
                </div>
            ) : (
                <div>
                <br />
                <p>Please click on a Inteloo...</p>
                </div>
            )}
            </div>
            </Row>
          </Container>
      </ React.Fragment>

  );

 IntelooSearch.propTypes = {
    match: PropTypes.string,
    history: PropTypes.string,

  }



};
export default IntelooSearch
