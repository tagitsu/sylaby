import styles from './Tips.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

const Tips = (props) => {

  return(
    <section className={clsx(styles.tips)}>
      <button 
        className={clsx(props.tip ? styles.tips__iconOn : styles.tips__iconOff)} 
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={faLightbulb} />
      </button>
      { props.tip && <div className={styles.tips__text}>{props.content}</div>}
    </section>
  );
};

export default Tips;