import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';

import GridView from "../components/elements/GridView";
import breedTemps from "../components/elements/temperaments";
import styles from "./Search.module.css"

function Search() {
  const [dogs, setDogs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(0)
  const [height, setHeight] = useState(0)

  const [nameInput, setNameInput] = useState("")
  const [filters, setFilters] = useState({minHeight: 5, maxHeight: 100, minWeight: 0, maxWeight: 120, lifespan: null, breedGroup: "All"})
  const [temperament, setTemperament] = useState(breedTemps.map(name => {return {name, clicked: false}}))
  const [sort, setSort] = useState(null)
  let debouncer;

  useEffect(() => {
    getBreeds();
    setPage(prevPage => prevPage + 1);
    console.log(temperament)
  }, [])

  useEffect(() => {
    console.log(sort)
  }, [sort])

  useEffect(() => {
    if(page < 10) { // 10 reaches end of API resources
      window.addEventListener("scroll", handleScrolling);
      return () => window.removeEventListener("scroll", handleScrolling);
    }
  }, [page])

  useEffect(() => {
    console.log(dogs)
    console.log([...new Set(dogs.reduce((prev, curr) => [...prev, ...curr.temperament.split(", ")], []))].sort())
  }, [dogs])

  useEffect(() => {
    console.log(filters)
  }, [filters])
  
  const handleScrolling = () => {

    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
      setIsFetching(true);
      setTimeout(() => getBreeds(), 500);
      setPage(prevPage => prevPage + 1);
    }
  }

  const getBreeds = () => {
    console.log(page);
    fetch(`https://api.thedogapi.com/v1/breeds?limit=12&page=${page}`, {
      headers: {
        "X-Api-Key": process.env.REACT_APP_DOGS_KEY
      },
    })
      .then(res => {
        res.json().then(data => {
          setDogs(previousState => [...previousState, ...data]);
          setIsFetching(false);
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

  const handleSortChange = (e) => {
    setSort(e.target.value)
  }

  const handleToggleFilters = () => {
    const newHeight = height === 0 ? "auto" : 0;
    setHeight(newHeight);
  }

  const handleFilterChange = (e) => {
    clearTimeout(debouncer);

    debouncer = setTimeout(() => {
      let inputValue = e.target.type == "number" ? parseInt(e.target.value) : e.target.value;
      const newFilters = { ...filters, [e.target.name]: inputValue }
      setFilters(newFilters);
    }, 500);
  }

  const handleTemperaments = (e) => {
    console.log(e.target.dataset.index)
    const newClicked = {name: e.target.value, clicked: !(temperament[e.target.dataset.index].clicked)}
    const filtered = temperament.filter((_trait, i) => {
      console.log(i, e.target.dataset.index)
      return i !== parseInt(e.target.dataset.index)
    });

    console.log(filtered);
    setTemperament([newClicked, ...filtered].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))
  }

  const matchesUserQuery = (breed) => {
    const nameFilter = nameInput ? nameInput : '[a-z]+';
    const regExp = new RegExp(nameFilter, 'gi');
    if (!regExp.test(breed.name)) return false;

    // Breed id 3 and 30 have a single number for height and lifespan so min and max are the same.
    // Otherwise destructure split string and ignore middle value.
    const [breedMinLife, , breedMaxLife] = breed.id === 3 || breed.id === 30? 
      [breed.life_span.split()[0], 0, breed.life_span.split()[0]] 
      : breed.life_span.split(" ");

    const [breedMinHeight, , breedMaxHeight] = breed.id === 3 || breed.id === 30? 
      [breed.height.metric.split()[0], 0, breed.height.metric.split()[0]] 
      : breed.height.metric.split(" ");

    const [breedMinWeight, , breedMaxWeight] =  breed.weight.metric.split(" ");
    
    const matchesLifespan = filters.lifespan ? filters.lifespan >= breedMinLife && filters.lifespan <= breedMaxLife : true;
    const matchesHeight = breedMinHeight >= filters.minHeight && breedMaxHeight <= filters.maxHeight;
    const matchesWeight = breedMinWeight >= filters.minWeight && breedMaxWeight <= filters.maxWeight;
    const matchesBreedGroup = filters.breedGroup !== "All" ? breed.breed_group === filters.breedGroup : true;

    const matchesTemperament = temperament.some(e => e.clicked === true) ? 
      temperament.filter(e => e.clicked === true).map(e => e.name).some(e => breed.temperament.split(", ").includes(e))
      : true;

    return matchesLifespan && matchesHeight && matchesWeight && matchesBreedGroup && matchesTemperament;
  }

  return (
    <div className="App">

      <section id={styles.heroSection}>
        <h1 id={styles.heroTitle}> <span>A house is not a houm</span><br/><span>without a dog 🐶</span> </h1>
      </section>

      <section id={styles.searchSection}>
          <div id={styles.searchRow}>
            <div id={styles.searchWrapper} className={styles.searchCapsule}>
              <input id={styles.searchInput} onChange={e => handleNameChange(e)} type="text" placeholder="Enter a breed's name"></input>
            </div>

            <div id={styles.sortWrapper} className={styles.searchCapsule}>
              <select id={styles.sortSelect} defaultValue="sort-by" onChange={(e) => handleSortChange(e)}>
                <option value="sort-by" disabled>Sort by</option>
                <option value="name">Name</option>
                <option value="height">Height</option>
                <option value="weight">Weight</option>
                <option value="life_span">Lifespan</option>
                <option value="breed_group">Breed group</option>

              </select>
            </div>

            <div id={styles.filterToggle} className={styles.searchCapsule} onClick={() => handleToggleFilters()}>
              Filters
            </div>

          </div>
      </section>
          
      <AnimateHeight duration={250} height={height}>

        <section id={styles.userInput}>

          <div id={styles.filterSection}>
            
            <div className={styles.formGroup}>
              <label> Weight as adult: </label>
              <div className={styles.formRow}>
                {'From '}
                <input className={styles.numInput} name="minWeight" onChange={e => handleFilterChange(e)} 
                  type="number" defaultValue={filters.minWeight} step="5" min="0" max="120"
                />
                {' to '}
                <input className={styles.numInput} name="maxWeight" onChange={e => handleFilterChange(e)} 
                  type="number" defaultValue={filters.maxWeight} step="5" min="0" max="120"
                />
                {' kg'}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label> Height as adult: </label>
              <div className={styles.formRow}>
                {'From '}
                <input className={styles.numInput} name="minHeight" onChange={e => handleFilterChange(e)} 
                  type="number" defaultValue={filters.minHeight} step="5" min="5" max="100"
                />
                {' to '}
                <input className={styles.numInput} name="maxHeight" onChange={e => handleFilterChange(e)} 
                  type="number" defaultValue={filters.maxHeight} step="5" min="5" max="100"
                />
                {' cm'}
              </div>

            </div>
            <div className={styles.formGroup}>
              <label> Life expectancy: </label>
              <input className={styles.numInput} name="lifespan" onChange={e => handleFilterChange(e)} 
                type="number" step="2" min="8" max="20"
              /> years
            </div>
            <div className={styles.formGroup}>
              <label> Breed group: </label>
              <select name="breedGroup" onChange={e => handleFilterChange(e)}>
                <option value="All">All</option>
                <option value="Herding">Herding</option>
                <option value="Hound">Hound</option>
                <option value="Mixed">Mixed</option>
                <option value="Non-Sporting">Non-Sporting</option>
                <option value="Sporting">Sporting</option>
                <option value="Terrier">Terrier</option>
                <option value="Toy">Toy</option>
                <option value="Working">Working</option>
              </select>
            </div>
          </div>

          <div id={styles.temperSection}>
            <div id={styles.temperMessage}>
              Select one or more temperament traits:
            </div>
            <div id={styles.temperWrapper}>
              {temperament.map((trait, i) => {
                return (
                  <button key={i} data-index={i} value={trait.name} 
                    className={trait.clicked ? styles.temperButtonClicked : styles.temperButton} 
                    onClick={e => handleTemperaments(e)}> 
                      {trait.name} 
                  </button>
                )
              })}
            </div>
          </div>

        </section>
      </AnimateHeight>

      <section id={styles.results}>
        <GridView data={dogs.filter(dog => matchesUserQuery(dog))} sorting={sort}/>

        {isFetching === true && (
          <div className={styles.loaderWrapper}>
            <div className={styles.loader}></div>
          </div>
        )}
      </section>

    </div>
  );
}

export default Search;
