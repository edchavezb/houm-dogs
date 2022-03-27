import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

import GridView from "../components/elements/GridView";

function Search({ data = "true" }) {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    console.log(process.env.REACT_APP_DOGS_KEY)
    getAllBreeds();
  }, [data])

  const getAllBreeds = () => {
    fetch("https://api.thedogapi.com/v1/breeds?limit=10&page=0", {
      headers: {
        "X-Api-Key": process.env.REACT_APP_DOGS_KEY
      },
    })
      .then(res => {
        res.json().then(data => {
          setDogs(data);
          console.log(data)
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="App">
      <h1> Hi, checkout the Search component!</h1>
      <GridView data={dogs}/>
    </div>
  );
}

export default Search;
