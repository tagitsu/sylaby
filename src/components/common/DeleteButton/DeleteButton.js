import styles from '../DeleteButton/DeleteButton.module.scss';

const DeleteButton = (props) => {

  if (!props.isHidden) {
  return(
    <button 
      className={styles.button} 
      onClick={props.onClick} 
      hidden={props.hidden}
    >
    {props.content}
    </button>
  )}
}

export default DeleteButton;