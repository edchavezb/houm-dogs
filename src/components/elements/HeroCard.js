import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from 'react';

import styles from './HeroCard.module.css'

function HeroCard({breed}) {

  return (
    <div className={styles.card}>

      <div className={styles.imageContainer}>
        {breed.breed_group && <div className={styles.breedGroup}>{breed.breed_group}</div>}
        <div className={styles.breedImage} style={{backgroundImage: `url(${breed.image.url})`}}></div>
      </div>

      <div className={styles.breedInfo}>

        <div className={styles.infoBody}>
          <span className={styles.breedName}> {breed.name} </span>
          <div className={styles.breedStats}>
            <div className={styles.statsRow}><span>Altura:</span> <span>{breed.height.metric} cm</span></div>
            <div className={styles.statsRow}><span>Peso:</span> <span>{breed.weight.metric} kg</span></div>
            <div className={styles.statsRow}><span>Vida promedio:</span> <span>{breed.life_span.split(" ").slice(0, 3).join(" ")} años</span></div>
          </div>
          <div className={styles.temperContainer}>
            {breed.temperament.split(", ").map(trait => {
              return (
                <div key={trait} className={styles.pill}>{`${trait}`}</div>
              )
            })}
          </div>
        </div>

        <div className={styles.infoFooter}>
          <button className={styles.moreButton}> Ver más </button>
          <button className={styles.likeButton}> Me gusta </button>
        </div>

      </div>
      
    </div>
  );
}

export default HeroCard;
