import styles from '../Option/Option.module.scss';

const Option = (props) => {

  if (!props.isHidden) {
  return(
    <button 
      className={styles.option} 
      onClick={props.onClick} 
      type={props.type}
      hidden={props.hidden}
    >
    {props.content}
    </button>
  )}
}

export default Option;