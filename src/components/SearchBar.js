import React, { useEffect, useState } from "react";

import useDebounce from "../hooks/useDebounce";

import searchIcon from "../icons/search.png";
import axios from "axios";

export default function SearchBar(props) {

  const [value, setValue] = useState("");
  const handleChange = event => setValue(event.target.value)

  const term = useDebounce(value, 700);

  useEffect(() => {

    if (term.length === 0) {
      return
    }
    else {

      //GET Request Setlist
      axios.get('/rest/1.0/search/setlists', {
        params: {
          'artistName': `"${value}"`,
          'p': '1'
        },
        headers: {
          'Accept': 'application/json',
          'x-api-key': 'eY_2IYBgy3ovn4sRZSqa9cTZy1nldhaUCvif'
        }
      })
        .then((res) => {
          props.setResults(res.data.setlist)
        })
        .catch((err) => {
          props.setResults([])
          console.log("Setlist Get Resquest Error:", err)
        })

      // GET Request Ticketmaster
      // axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
      axios.get('https://app.ticketmaster.com/discovery/v2/suggest', {
        params: {
          'keyword': `"${value}"`,
          'segmentId': 'KZFzniwnSyZfZ7v7nJ', 
          'sort': 'name,asc',
          'apikey': 'kMv2pjo5bzSz5iyaz0h5aLqGnQcWyOSL'
        }
      })
        .then((res) => {
          props.setTicketmaster(res.data._embedded)
          console.log(res.data._embedded)
        })
        .catch((err) => {
          props.setTicketmaster([])
          console.log("Ticketmaster Get Request Error", err)
        })
    }
  }, [term])

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
