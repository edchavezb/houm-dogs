import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from 'react';

import HeroCard from "./HeroCard";

function GridView({data}) {

  return (
    <div id='grid'>
      {data.map(e => {
          return (
            <HeroCard key={e.id} breed={e}></HeroCard>
          )
      })}
    </div>
  );
}

export default GridView;
