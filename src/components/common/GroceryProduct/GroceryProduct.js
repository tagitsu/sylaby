import clsx from 'clsx';
import { useDrag } from 'react-dnd';
import styles from '../GroceryProduct/GroceryProduct.module.scss';

const GroceryProduct = ({ product, size, text }) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'product',
    item: { id: product.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }));

  return(
      <img
        className={clsx(styles.product, isDragging && styles.dragging)}
        ref={drag}
        src={`${process.env.PUBLIC_URL}/images/grocery/${product.icon}`}
        alt={product.name}
        style={{ opacity: isDragging ? 0.5 : 1, width: size, height: size }}
      />
  )
}

export default GroceryProduct;