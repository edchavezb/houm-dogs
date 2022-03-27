import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

import GridView from "../components/elements/GridView";

function Search({ data = "true" }) {
  const [dogs, setDogs] = useState([]);
  const [nameInput, setNameInput] = useState("no")

  useEffect(() => {
    getAllBreeds();
  }, [data])

  const getAllBreeds = () => {
    fetch("https://api.thedogapi.com/v1/breeds", {
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

  const matchesUserQuery = (dogBreed) => {
    const nameFilter = nameInput ? nameInput : '[a-z]+';
    console.log(nameFilter);
    const regExp = new RegExp(nameFilter, 'gi');
    return regExp.test(dogBreed.name);
  }

  return (
    <div className="App">
      <h1> Hi, checkout the Search component!</h1>
      <GridView data={dogs.filter(dog => matchesUserQuery(dog)).slice(0, 12)}/>
    </div>
  );
}

export default Search;
