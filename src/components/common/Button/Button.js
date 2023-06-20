import clsx from 'clsx';
import styles from '../Button/Button.module.scss';

const Button = (props) => {

  if (!props.isHidden) {
  return(
    <button 
      className={clsx(styles.button, props.name === 'tipBtn' && styles.tip, props.name === 'setupBtn' && styles.setup, )} 
      onClick={props.onClick}
      name={props.name}
      type={props.type}
      hidden={props.hidden}
    >
    {props.content}
    </button>
  )}
}

export default Button;