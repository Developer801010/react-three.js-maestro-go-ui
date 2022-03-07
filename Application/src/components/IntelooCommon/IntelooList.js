import React, { useState, useEffect } from "react";
import intelooDataService from "../intelooServices/service_inteloo";
import { Link } from "react-router-dom";


const IntelooList = () => {
  const [inteloo, setInteloo] = useState([]);
  const [currentinteloo, setCurrentinteloo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [intelooTitle, setIntelooTitle] = useState("");
  useEffect(() => {
    retrieveInteloo();
  }, []);
  const onChangeintelooTitle = e => {
    const intelooTitle = e.target.value;
    setIntelooTitle(intelooTitle);
  };
  const retrieveInteloo = () => {
   intelooDataService.getAll()
      .then(response => {
        setInteloo(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveInteloo();
    setCurrentinteloo(null);
    setCurrentIndex(-1);
  };
  const setActiveinteloo = (inteloo, index) => {
    setCurrentinteloo(inteloo);
    setCurrentIndex(index);
  };
  const removeAllInteloo = () => {
    intelooDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };
  const findByTitle = () => {
    intelooDataService.findByTitle(intelooTitle)
      .then(response => {
        setInteloo(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Inteloo Search</h4>
        <ul className="list-group">
          {inteloos &&
            inteloos.map((inteloo, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveinteloo(inteloo, index)}
                key={index}
              >
                {inteloo.title}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentinteloo ? (
          <div>
            <h4>Inteloo</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentinteloo.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentinteloo.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentinteloo.published ? "Published" : "Pending"}
            </div>
            <Link
              to={"../../pages/Inteloo/inteloo-search" + currentinteloo.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a inteloo...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default IntelooList;
