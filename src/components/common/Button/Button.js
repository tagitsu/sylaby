import styles from '../Button/Button.module.scss';

const Button = (props) => {

  if (!props.isHidden) {
  return(
    <button 
      className={styles.button} 
      onClick={props.onClick} 
      type={props.type}
      hidden={props.hidden}
    >
    {props.content}
    </button>
  )}
}

export default Button;