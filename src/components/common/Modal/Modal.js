import styles from '../Modal/Modal.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
      <div className={styles.modal__container}>
        <div className={styles.modal__wave}></div>
        <header className={styles.modal__header}>
          <h1 className={styles.modal__title}>{title}</h1>
          <button className={clsx(styles.modal__close, styles.modal__button)} onClick={() => close(false)}><FontAwesomeIcon icon={faXmark} /></button>
        </header>
        <article className={styles.modal__content}>
          { content }
          { accept &&
          <button 
            className={clsx(styles.modal__accept, styles.modal__button)}
            onClick={handleAccept}
          >
            { acceptText ? acceptText : 'OK' }
          </button>
        }
        </article>
      </div>
    </dialog>
  )
};

export default Modal;