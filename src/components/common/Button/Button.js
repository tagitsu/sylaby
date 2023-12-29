import clsx from 'clsx';
import styles from '../Button/Button.module.scss';

const Button = ({ name, type, onClick, hidden, content }) => {

  if (!hidden) {
  return(
    <button 
      className={clsx(styles.button, name === 'gamesBtn' && styles.games, name === 'tipBtn' && styles.tip, name === 'setupBtn' && styles.setup, type === 'submit' && styles.setup)} 
      onClick={onClick}
      name={name}
      type={type}
      hidden={hidden}
    >
    {content}
    </button>
  )}
}

export default Button;