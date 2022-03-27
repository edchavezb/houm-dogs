import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from 'react';

function HeroCard({breed}) {

  return (
    <div className="App">
      <span> {breed.name} </span>
      
    </div>
  );
}

export default HeroCard;
