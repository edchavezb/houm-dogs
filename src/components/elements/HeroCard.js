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
            <div className={styles.statsRow}><span>Height:</span> <span>{breed.height.metric} cm</span></div>
            <div className={styles.statsRow}><span>Weight:</span> <span>{breed.weight.metric} kg</span></div>
            <div className={styles.statsRow}><span>Average lifespan:</span> <span>{breed.life_span.split(" ").slice(0, 3).join(" ")} years</span></div>
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
          <a href={breed.image.url}><button className={styles.moreButton}> See image </button></a>
          <button className={styles.likeButton}> Save breed </button>
        </div>

      </div>
      
    </div>
  );
}

export default HeroCard;
