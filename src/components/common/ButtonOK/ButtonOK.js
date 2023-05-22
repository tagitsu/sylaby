import styles from '../ButtonOK/ButtonOK.module.scss';

const ButtonOK = (props) => {

  if (!props.isHidden) {
  return(
    <button 
      className={styles.button} 
      onClick={props.onClick} 
      type={props.type}
      hidden={props.hidden}
    >
    OK
    </button>
  )}
}

export default ButtonOK;