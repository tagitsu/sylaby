import { useState } from 'react';
import styles from '../Footer/Footer.module.scss';
import Modal from '../../common/Modal/Modal';


const Footer = () => {

  const [ openModal, setOpenModal ] = useState({ isOpen: false, signal: '' });

  const aboutGame = <div><p>Pomysł na grę pojawił się gdy mój synek niemal każde wypowiadane słowo rozkładał na sylaby. Zaczął łączyć sylaby i układać z nich wiele słów, a nie każde dało się znaleźć w słowniku. Jak przekonać przedszkolaka, że jedne ze słów zrozumieją inni ludzie a inne niezupełnie? </p></div>
  const rules = <div><p>Po naciśnięciu przycisku start pojawia się sylaba do której należy dopasować drugą tak, aby stworzyły istniejące słowo. </p></div>;
  const contact = 
    <form onSubmit={console.log('wiadomość wysłana')}>
      <input type='text' />
      <input type='email' />
      <button type='submit'>Wyślij wiadomość</button>
    </form>
  // Modal = ({ title, content, accept, acceptArg, acceptText, close })
  
  return(
    <footer className={styles.footer}>
      <p>&copy; 2024 tagitsu</p>
        <nav>
          <ul className={styles.footer__menu}>
            <li onClick={() => setOpenModal({isOpen: true, signal: 'about'})}> o grze </li>
            <li onClick={() => setOpenModal({isOpen: true, signal: 'rules'})}> zasady </li>
            <li onClick={() => setOpenModal({isOpen: true, signal: 'contact'})}> kontakt </li>
          </ul>
        </nav>

        { openModal.signal === 'about' && <Modal title='o grze' content={aboutGame} close={setOpenModal} /> }
        { openModal.signal === 'rules' && <Modal title='zasady' content={rules} close={setOpenModal} /> }
        { openModal.signal === 'contact' && <Modal title='kontakt' content={contact} close={setOpenModal} /> }
    </footer>

  );
};

export default Footer;