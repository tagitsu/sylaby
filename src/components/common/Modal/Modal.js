import styles from '../Modal/Modal.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ title, content, accept, acceptArg, acceptText, close }) => {


  const handleAccept = () => {
    if (acceptArg) {
      accept(acceptArg)
    } else {
      accept();
    }
  };

  return(
    <dialog className={styles.modal}>
      <div className={styles.modal__info}>
        <button className={clsx(styles.modal__close, styles.modal__button)} onClick={() => close(false)}><FontAwesomeIcon icon={faXmarkCircle} /></button>
        <div className={styles.modal__text}>{title}</div>
        <div className={styles.modal__text}>{content}</div>
        { accept &&
          <button 
            className={clsx(styles.modal__accept, styles.modal__button)}
            onClick={handleAccept}
          >
            { acceptText ? acceptText : 'OK' }
          </button>
        }
        {/* <button
          className={clsx(styles.modal__cancel, styles.modal__button)}
          onClick={() => close(false)} 
        >
          Anuluj
        </button> */}
      </div>
    </dialog>
  )
};

export default Modal;