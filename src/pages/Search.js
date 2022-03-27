import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

import GridView from "../components/elements/GridView";

function Search({ data = "true" }) {
  const [dogs, setDogs] = useState([]);
  const [nameInput, setNameInput] = useState("")
  let typingDebouncer;

  useEffect(() => {
    getAllBreeds();
  }, [data])

  useEffect(() => {
    console.log(nameInput)
  }, [nameInput])

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

  const handleNameChange = (e) => {
    clearTimeout(typingDebouncer);
    typingDebouncer = setTimeout(() => setNameInput(e.target.value), 500);
  }

  const matchesUserQuery = (dogBreed) => {
    const nameFilter = nameInput ? nameInput : '[a-z]+';
    const regExp = new RegExp(nameFilter, 'gi');
    return regExp.test(dogBreed.name);
  }

  return (
    <div className="App">
      <h1> Hi, checkout the Search component!</h1>
      <input onChange={e => handleNameChange(e)} type="text"></input>
      <GridView data={dogs.filter(dog => matchesUserQuery(dog)).slice(0, 12)}/>
    </div>
  );
}

export default Search;
