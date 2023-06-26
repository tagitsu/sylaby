import styles from '../Option/Option.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

const Option = (props) => {


  console.log('option', props);

  if (props.isCorrect === undefined && props.isWrong === undefined) {
    return(
      <button 
        className={clsx(styles.option)} 
        onClick={props.onClick} 
        type={props.type}
        disabled={false}
        
      >
      {props.content}
      </button>
    )
  } else if (props.content && props.isCorrect || props.isWrong) {
    return(
      <button 
        className={clsx( (props.answer == props.content) && styles.clicked, styles.option, (props.content == props.dots) && styles.correct, (props.content != props.dots) && styles.wrong)}
        onClick={props.onClick} 
        type={props.type}
        disabled={true}
      >
      {props.content}
      </button>
    )
  }
  
}

export default Option;