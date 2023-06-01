import { useDrag } from 'react-dnd';
import styles from '../GroceryProduct/GroceryProduct.module.scss';

const GroceryProduct = ({product, size}) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    item: { id: product.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }));

  return(
    <img
      ref={drag}
      src={`${process.env.PUBLIC_URL}/images/grocery/${product.icon}`}
      alt={product.name}
      style={{ opacity: isDragging ? 0.5 : 1, width: size }}
    />
  )
}

export default GroceryProduct;