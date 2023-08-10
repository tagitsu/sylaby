import styles from './Tips.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const Tips = ({ tip, onClick, content }) => {

  return(
    <section className={clsx(styles.tips)}>
      <button 
        className={clsx(tip ? styles.tips__iconOn : styles.tips__iconOff)} 
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faLightbulb} />
      </button>
      { tip && 
        <div className={styles.tips__text}> 
          <button className={styles.tips__close} onClick={onClick}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          {content} 
        </div>
      }
    </section>
  );
};

export default Tips;