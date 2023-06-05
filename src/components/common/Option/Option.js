import styles from '../Option/Option.module.scss';
import clsx from 'clsx';

const Option = (props) => {

  console.log('option', props.correctAnswer, props.content);


  if (props.correct === props.content) {
    return(
      <button 
        className={clsx(styles.option, styles.option__correct)} 
        onClick={props.onClick} 
        type={props.type}
      >
      {props.content}
      </button>
    )
  } else {
    return(
      <button 
        className={styles.option} 
        onClick={props.onClick} 
        type={props.type}
      >
      {props.content}
      </button>
    )
  }
}

export default Option;