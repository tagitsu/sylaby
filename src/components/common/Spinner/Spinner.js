import clsx from 'clsx';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import styles from '../Spinner/Spinner.module.scss';

const Spinner = (props) => {

 
  return(
    <div className={styles.spinner}>
        <div className={clsx(styles.spinner__dot, styles.spinner__dot1)}></div>
        <div className={clsx(styles.spinner__dot, styles.spinner__dot2)}></div>
        <div className={clsx(styles.spinner__dot, styles.spinner__dot3)}></div>
        <div className={clsx(styles.spinner__dot, styles.spinner__dot4)}></div>
        <div className={clsx(styles.spinner__dot, styles.spinner__dot5)}></div>
        <div className={clsx(styles.spinner__dot, styles.spinner__dot6)}></div>
        <div className={clsx(styles.spinner__dot, styles.spinner__dot7)}></div>
        <span className={styles.spinner__text}> {props.content} </span>
    </div>
  )
}

export default Spinner;