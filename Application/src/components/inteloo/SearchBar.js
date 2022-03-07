import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

function Searchbar(props) {
  const { 
    onSearch 
  } = props;

  const [searchText, setSearchText] = useState('')

  const handleInput = (e) => {
    const text = e.target.value
    setSearchText(text)
  }

  const handleEnterKeyPressed = (e) => {
    if(e.key=== 'Enter') {
      onSearch(searchText)
    }
  }

  return (
    <div>
        <input
          className="form-control"
          onChange={handleInput}
          onKeyPress={handleEnterKeyPressed}
          type="text"
          value={searchText}
          placeholder="Inteloo your data"
        />
    </div>
  );

  Searchbar.propTypes = {
    onSearch: PropTypes.object
  }

}

export default Searchbar;