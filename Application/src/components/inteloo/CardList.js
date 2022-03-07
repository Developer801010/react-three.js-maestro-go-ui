import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";

function CardList({ results }) {
  let data = [];
  if (results.data) {
    data = results.data.Search || [];
  }
  console.log(data);
  return (
    <div className="result">
      {data.map((item) => (
        <Card key={item.id} netobj={item} />
      ))}
    </div>
  );
  CardList.propTypes = {
    results: PropTypes.object
  }
}

export default CardList;