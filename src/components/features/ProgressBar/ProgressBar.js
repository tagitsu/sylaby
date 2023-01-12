import styles from '../ProgressBar/ProgressBar.module.scss';

const ProgressBar = (props) => {

  console.log('progBar - propsy', props.xp, props.levelUp);

  const barWidth = (((props.xp) / (props.levelUp)) * 100) + '%';
  console.log('prog bar - width', barWidth);
  // const pokemonHeight = (choosenPokemon[0].features.height) * 100;
  // const pokemonColor = (choosenPokemon[0].color);
  const root = document.querySelector(':root');
  root.style.setProperty('--player-xp', barWidth);
  // root.style.setProperty('--pokemon-color', pokemonColor);

  return(
    <div className={styles.prog}>
      <div className={styles.prog__bar}></div>
    </div>
  );
};

export default ProgressBar;