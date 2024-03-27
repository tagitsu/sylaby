import styles from '../Modal/Modal.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle, faXmark } from '@fortawesome/free-solid-svg-icons';

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
      <button className={clsx(styles.modal__close, styles.modal__button)} onClick={() => close(false)}><FontAwesomeIcon icon={faXmark} /></button>
      <div className={styles.modal__container}>
        <button className={clsx(styles.modal__close, styles.modal__button)} onClick={() => close(false)}><FontAwesomeIcon icon={faXmark} /></button>
        <header className={styles.modal__header}>
          <h1 className={styles.modal__text}>{title}</h1>
        </header>
        <article className={styles.modal__content}>
          <p className={styles.modal__text}>{content}</p>
          { accept &&
          <button 
            className={clsx(styles.modal__accept, styles.modal__button)}
            onClick={handleAccept}
          >
            { acceptText ? acceptText : 'OK' }
          </button>
        }
        </article>
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