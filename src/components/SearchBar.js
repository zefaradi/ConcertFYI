import React, { useEffect, useState, useCallback } from "react";

// import useDebounce from "../hooks/useDebounce";

import searchIcon from "../icons/search.png";
import axios from "axios";

export default function SearchBar(props) {

  const [value, setValue] = useState("");
  const handleChange = event => setValue(event.target.value)

  // const term = useDebounce(value, 400);

  useEffect(() => {
    axios.get('/rest/1.0/search/setlists', {
      params: {
        'artistName': value,
        'p': '1'
      },
      headers: {
        'Accept': 'application/json',
        'x-api-key': 'eY_2IYBgy3ovn4sRZSqa9cTZy1nldhaUCvif'
      }
    })
      .then((res) => {
        console.log(res.data.setlist[0]);
        props.setResults([res.data.setlist[0]])
      })
  }, [value])

  return (
    <div className="search">
      <form className="input-container-search" onSubmit={event => event.preventDefault()}>
        <img className="searchIcon" src={searchIcon}></img>
        <input
          className="input-text-search"
          type="search"
          value={value}
          placeholder="Search your favorite artist"
          onChange={handleChange}
        ></input>
      </form>
    </div>
  );
}
