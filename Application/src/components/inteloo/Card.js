import React from "react";

export default function Card(props) {
  const { data } = props;
  return (
      <React.Fragment>
    <div className="resultCard">
      <figure className="image is-48x48">
        <img
          src={data.ip}
          alt= {data.name}
        />
      </figure>
      <h4 className="bolder">{data.id}</h4>
      <span><b>Status:</b>{data.status}</span>
    </div>
    </React.Fragment>
  );
  Card.propTypes = {
    data: PropTypes.object,
  }

}
