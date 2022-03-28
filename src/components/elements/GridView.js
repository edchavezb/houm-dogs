import HeroCard from "./HeroCard";

import styles from "./GridView.module.css"

function GridView({data, sorting}) {

  const sortCards = (arrObj, sortProp) => {
    if (sortProp === null) return arrObj;
    let sortedArray = [];

    // Properties need to be accessed differently for comparison. Switch is easier to read.
    switch (sortProp){
      case "height":
      case "weight":
        sortedArray = arrObj.sort((a, b) => {
          const aProp = parseInt(a[sortProp].metric.split(" ")[0]) + parseInt(a[sortProp].metric.split(" ")[2]) / 2;
          const bProp = parseInt(b[sortProp].metric.split(" ")[0]) + parseInt(b[sortProp].metric.split(" ")[2]) / 2;
          return (aProp > bProp ? 1 : bProp > aProp ? -1 : 0)
        })
      break;

      case "life_span":
        sortedArray = arrObj.sort((a, b) => {
          const aProp = parseInt(a[sortProp].split(" ")[0]) + parseInt(a[sortProp].split(" ")[2]) / 2;
          const bProp = parseInt(b[sortProp].split(" ")[0]) + parseInt(b[sortProp].split(" ")[2]) / 2;
          return (aProp > bProp ? 1 : bProp > aProp ? -1 : 0)
        })
      break;

      case "name":
      case "breed_group":
        sortedArray = arrObj.sort((a, b) => {
          return (a[sortProp] > b[sortProp]) ? 1 : ((b[sortProp] > a[sortProp]) ? -1 : 0)
        })
      break;
    }

    return sortedArray;
  }

  return (
    <div id='grid' className={styles.gridContainer}>
      {sortCards(data, sorting).map((e, i) => {
          return (
            <HeroCard key={i} breed={e}></HeroCard>
          )
      })}
    </div>
  );
}

export default GridView;
