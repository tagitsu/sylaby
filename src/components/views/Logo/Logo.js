import styles from './Logo.module.scss';

const Logo = () => {
  return(
    <h1 className={styles.logo}>
      sy
      <div className={styles.circle} />
      la
      <div className={styles.circle} />
      by
    </h1>
  );
};

export default Logo;