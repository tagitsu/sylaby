import { useState } from 'react';
import styles from '../Footer/Footer.module.scss';
import Modal from '../../common/Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import appUtils from '../../../utils/appUtils';



const Footer = ({ playerEmail }) => {

  const [ openModal, setOpenModal ] = useState({ isOpen: false, signal: '' });
  const [ email, setEmail ] = useState('');

  const aboutGame = <div className={styles.footer__article}>{appUtils.getAboutContent()}</div>
  const rules = <div className={styles.footer__article}> {appUtils.getInstructions()} </div>;
  const contact = 
    <form onSubmit={() => setOpenModal({isOpen: true, signal: 'sent'})}>
      <p> Jeśli masz jakiekolwiek pytania odnośnie gry, opisz je w wiadomości. Z chęcią na wszytkie odpowiemy.</p>
      <label>
        <p>Temat</p>
        <input type='text' />
      </label>
      <label>
        <p>Treść wiadomości</p>
        <textarea />
      </label>
      <label>
        <p>Twój adres e-mail</p>
        <input type='email' value={playerEmail} required onChange={(e) => setEmail(e.target.value) } />
      </label>
      <button type='submit' aria-label='wyślij wiadomość'>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>

  const sent = 
    <div className={styles.footer__article}>
      <p>Twoja wiadomość została poprawnie przesłana. W nabliższym czasie wyślemy odpowiedź na podany przez Ciebie adres e-mail.</p>
    </div>
  
  return(
    <footer className={styles.footer}>
      <p className={styles.footer__copyrights}>&copy; 2024 tagitsu</p>
        <nav>
          <ul className={styles.footer__menu}>
            <li onClick={() => setOpenModal({isOpen: true, signal: 'about'})}> o sylabach </li>
            <li onClick={() => setOpenModal({isOpen: true, signal: 'rules'})}> zasady gry </li>
            <li onClick={() => setOpenModal({isOpen: true, signal: 'contact'})}> kontakt </li>
          </ul>
        </nav>

        { openModal.signal === 'about' && <Modal title='o sylabach' content={aboutGame} close={setOpenModal} /> }
        { openModal.signal === 'rules' && <Modal title='zasady' content={rules} close={setOpenModal} /> }
        { openModal.signal === 'contact' && <Modal title='kontakt' content={contact} close={setOpenModal} /> }
        { openModal.signal === 'sent' && <Modal title='wysłane!' content={sent} close={setOpenModal} /> }
    </footer>

  );
};

export default Footer;