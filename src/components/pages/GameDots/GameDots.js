import { useState } from "react";
import { useParams } from "react-router";
import Button from "../../common/Button/Button";
import ActivePlayer from "../../features/ActivePlayer/ActivePlayer";
import styles from './GameDots.module.scss';

const GameDots = () => {

  const [ points, setPoints ] = useState(0);
  const activePlayerParam = useParams();

  return(
    <div className={styles.dots}>
      <ActivePlayer id={activePlayerParam.id} points={points}/>
      <section className={styles.dots__board}>
        {/** parametr z liczbą losowaną do 10, tworzy tablicę z elementami, mapuję tablice tworząc divy-kropki */}
        <div className={styles.dots__dots}>

        </div>
      </section>
      <Button content='OK' />
    </div>
  );
};

export default GameDots;