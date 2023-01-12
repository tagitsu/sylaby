import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import styles from './Logo.module.scss';

const Logo = () => {
  return(
    <h1 className={styles.logo}>
    sy
    <FontAwesomeIcon className={styles.logo__dot} icon={faCircle} />
    la
    <FontAwesomeIcon className={styles.logo__dot} icon={faCircle} />
    by
    </h1>
  );
};

export default Logo;