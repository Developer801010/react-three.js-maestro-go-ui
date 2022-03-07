import React, { useState, useEffect } from "react";
import IntelooDataService from "../../intelooServices/service_inteloo";
const Inteloo = props => {
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
        props.history.push("/inteloo");
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
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
                    <button
                    className="badge badge-primary mr-2"
                    onClick={() => updatePublished(false)}
                    >
                    UnPublish
                    </button>
                ) : (
                    <button
                    className="badge badge-primary mr-2"
                    onClick={() => updatePublished(true)}
                    >
                    Publish
                    </button>
                )}
                <button className="badge badge-danger mr-2" onClick={deleteInteloo}>
                    Delete
                </button>
                <button
                    type="submit"
                    className="badge badge-success"
                    onClick={updateInteloo}
                >
                    Update
                </button>
                <p>{message}</p>
                </div>
            ) : (
                <div>
                <br />
                <p>Please click on a Inteloo...</p>
                </div>
            )}
            </div>
  );
};
export default Inteloo;
