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
    <div className={styles.product}>
      <img
        ref={drag}
        src={`${process.env.PUBLIC_URL}/images/grocery/${product.icon}`}
        alt={product.name}
        style={{ opacity: isDragging ? 0.5 : 1, width: size }}
      />
      <p>{ text }</p>
    </div>
    
  )
}

export default GroceryProduct;