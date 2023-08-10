import styles from './Logo.module.scss';

const Logo = () => {
  return(
      <div className={styles.logo}>
        {/* <div className={styles.logo__icon}>
          <div className={styles.logo__inter}>
            <p className={styles.logo__name}>za</p>
            <p className={styles.logo__name}>GRAJ</p>
            <p className={styles.logo__name}>my</p>
          </div>
        </div> */}
        <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} />
      </div>
  );
};

export default Logo;