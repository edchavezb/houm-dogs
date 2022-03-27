import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from 'react';

import HeroCard from "./HeroCard";

import styles from "./GridView.module.css"

function GridView({data}) {

  return (
    <div id='grid' className={styles.gridContainer}>
      {data.map((e, i) => {
          return (
            <HeroCard key={i} breed={e}></HeroCard>
          )
      })}
    </div>
  );
}

export default GridView;
