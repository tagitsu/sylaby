import styles from './Tips.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

const Tips = (props) => {
  return(
    <section className={styles.tips}>
      <button className={styles.tips__icon}><FontAwesomeIcon icon={faLightbulb} /></button>
      {props.content}
    </section>
  );
};

export default Tips;