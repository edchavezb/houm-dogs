import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from 'react';

import styles from './HeroCard.module.css'

function HeroCard({breed}) {

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img className={styles.breedImage} src={breed.image.url}></img>
      </div>
      <div>
        <span> {breed.name} </span>
      </div>
      
    </div>
  );
}

export default HeroCard;
