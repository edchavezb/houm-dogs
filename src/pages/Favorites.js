import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from 'react';

function Favorites({data = "true"}) {

  useEffect(() => {
    console.log(process.env.REACT_APP_DOGS_KEY)
  }, [data])

  return (
    <div className="App">
      <h1> Hi, this is Favorites</h1>
    </div>
  );
}

export default Favorites;
