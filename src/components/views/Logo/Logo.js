import styles from './Logo.module.scss';

const Logo = () => {
  return(
      <div className={styles.logo}>
        <p className={styles.logo__name}>sy</p>
        <p className={styles.logo__name}>la</p>
        <p className={styles.logo__name}>by</p>
      </div>
  );
};

export default Logo;