import styles from './Logo.module.scss';

const Logo = () => {
  return(
    <h1 className={styles.logo}>
      za
      <div className={styles.circle} />
      graj
      <div className={styles.circle} />
      my
    </h1>
  );
};

export default Logo;