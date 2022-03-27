import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

import GridView from "../components/elements/GridView";

function Search({ data = "true" }) {
  const [dogs, setDogs] = useState([]);
  const [nameInput, setNameInput] = useState("")
  const [filters, setFilters] = useState({minHeight: 5, maxHeight: 100, minWeight: 1, maxWeight: 120, lifespan: null, breedGroup: ""})
  const [temperament, setTemperament] = useState([])
  let debouncer;

  useEffect(() => {
    getAllBreeds();
  }, [data])

  useEffect(() => {
    console.log(nameInput)
  }, [nameInput])

  useEffect(() => {
    console.log(filters)
  }, [filters])

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
    clearTimeout(debouncer);
    debouncer = setTimeout(() => setNameInput(e.target.value), 500);
  }

  const handleFilterChange = (e) => {
    clearTimeout(debouncer);

    debouncer = setTimeout(() => {
      let inputValue = e.target.type == "number" ? parseInt(e.target.value) : e.target.value;
      const newFilters = { ...filters, [e.target.name]: inputValue }
      setFilters(newFilters);
    }, 500);
  }

  const matchesUserQuery = (dogBreed) => {
    const nameFilter = nameInput ? nameInput : '[a-z]+';
    const regExp = new RegExp(nameFilter, 'gi');
    if (!regExp.test(dogBreed.name)) return false;
    
    const matchesWeight = dogBreed.weight.metric.split(" ")[0] >= filters.minWeight && dogBreed.weight.metric.split(" ")[2] <= filters.maxWeight;
    const matchesHeight = dogBreed.height.metric.split(" ")[0] >= filters.minHeight && dogBreed.height.metric.split(" ")[2] <= filters.maxHeight;
    const matchesLifespan = filters.lifespan ? filters.lifespan >= dogBreed.life_span.split(" ")[0] && filters.lifespan <= dogBreed.life_span.split(" ")[2] : true;
    return matchesWeight && matchesHeight && matchesLifespan;
  }

  return (
    <div className="App">
      <h1> A house is not a houm without a dog </h1>
      <div>
        <label> Enter a breed's name: </label>
        <input onChange={e => handleNameChange(e)} type="text"></input>
      </div>
      <div>
        <label> Weight as adult (in kg): </label>
        From <input name="minWeight" onChange={e => handleFilterChange(e)} type="number" value={filters.minWeight}/>
        To <input name="maxWeight" onChange={e => handleFilterChange(e)} type="number" value={filters.maxWeight}/>
      </div>
      <div>
        <label> Height as adult (in cm): </label>
        From <input name="minHeight" onChange={e => handleFilterChange(e)} type="number" value={filters.minHeight}/>
        To <input name="maxHeight" onChange={e => handleFilterChange(e)} type="number" value={filters.maxHeight}/>
      </div>
      <div>
        <label> Life expectancy (in years): </label>
        <input name="lifespan" onChange={e => handleFilterChange(e)} type="number"></input>
      </div>
      <GridView data={dogs.filter(dog => matchesUserQuery(dog)).slice(0, 12)}/>
    </div>
  );
}

export default Search;
