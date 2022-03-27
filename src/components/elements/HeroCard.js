import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from 'react';

import styles from './HeroCard.module.css'

function HeroCard({breed}) {

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.breedImage} style={{backgroundImage: `url(${breed.image.url})`}}></div>
      </div>
      <div className={styles.breedInfo}>
        <span className={styles.breedName}> {breed.name} </span>
        <div className={styles.heightWeight}>
          <span> Height: {breed.height.metric} cm </span>
          <span> Weight: {breed.weight.metric} kg</span>
        </div>
      </div>
      
    </div>
  );
}

export default HeroCard;
