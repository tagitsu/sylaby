import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircle} from '@fortawesome/free-solid-svg-icons';
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