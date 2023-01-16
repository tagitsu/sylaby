import styles from '../Button/Button.module.scss';

const Button = (props) => {

  return(
    <button className={styles.button}>{props.content}</button>
  )
}

export default Button;