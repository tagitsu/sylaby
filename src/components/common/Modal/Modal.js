import styles from '../Modal/Modal.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

const Modal = (props) => {

  const root = document.querySelector(':root');
  root.style.setProperty('--color', props.color);

  const handleAccept = () => {
    if (props.acceptArg) {
      props.accept(props.acceptArg)
    } else {
      props.accept();
    }
  }

  return(
    <dialog className={styles.modal}>
      <div className={styles.modal__info}>
        <button className={clsx(styles.modal__close, styles.modal__button)} onClick={() => props.cancel(false)}><FontAwesomeIcon icon={faXmarkCircle} /></button>
        <div className={styles.modal__text}>{props.text}</div>
        <button 
          className={clsx(styles.modal__accept, styles.modal__button)}
          
          onClick={handleAccept}
        >
          {props.acceptBtn}
        </button>
        <button
          className={clsx(styles.modal__cancel, styles.modal__button)}
          onClick={() => props.cancel(false)} 
        >
        Anuluj
        </button>
      </div>
    </dialog>
  )
};

export default Modal;