import { useDrag } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../Sign/Sign.module.scss';
import clsx from 'clsx';

const Sign = (props) => {

  const [ { isDragging }, drag ] = useDrag({
    type: 'sign',
    item: { name: props.name, icon: props.icon },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return(
    <div key={props.name} className={clsx( styles.sign, isDragging ? styles.dragging : styles.sign )} ref={drag}>
      {props.icon}
    </div>
  )
}

export default Sign;