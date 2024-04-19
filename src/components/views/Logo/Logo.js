import styles from './Logo.module.scss';

const Logo = () => {
  return(
      <ul className={styles.logo}>
        <li className={styles.logo__bubble}>
          <div className={styles.logo__syllable}>sy</div>
        </li>
        <li className={styles.logo__mini}></li>
        <li className={styles.logo__bubble}>
          <span className={styles.logo__syllable}>la</span>
        </li>
        <li className={styles.logo__mini}></li>
        <li className={styles.logo__bubble}>
          <span className={styles.logo__syllable}>ba</span>
        </li>
      </ul>
  );
};

export default Logo;