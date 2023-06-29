import { useState } from "react";
import { useGetPlayersQuery, useUpdatePlayerMutation, useGetLevelsQuery } from "../../../api/apiSlice";

import ButtonOK from "../../common/ButtonOK/ButtonOK";
import Button from "../../common/Button/Button";
import ActivePlayer from "../../features/ActivePlayer/ActivePlayer";
import styles from './GameGrocery.module.scss';
import utils from '../../../utils/gameGroceryUtils';
import playerUtils from "../../../utils/playerUtils";
import GroceryProduct from "../../common/GroceryProduct/GroceryProduct";
import Tips from "../../views/Tips/Tips";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faShop, faList, faAppleWhole, faCarrot, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDrop } from "react-dnd";
import clsx from "clsx";
import uniqid from 'uniqid';

const GameGrocery = () => {

  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();
  const [ updatePlayer ] = useUpdatePlayerMutation();

  let activePlayer, playerLevel, nextLevel;
  if (playersOK && levelsOK) {
    [ activePlayer ] = players.filter( player => player.isActive);
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id);
    [ nextLevel ] = levels.filter( level => activePlayer.level + 1 === level.id);
    if (activePlayer.xp >= playerLevel.nextLevel) { playerUtils.levelUp(updatePlayer, activePlayer, nextLevel) }
  }

  const [ cart, setCart ] = useState([]);
  const [ fruits, setFruits ] = useState([]);
  const [ vegetables, setVegetables ] = useState([]);
  const [ hidden, setHidden ] = useState(false);
  const [ tip, setTip ] = useState(false);
  const [ open, setOpen ] = useState(false);


  const [ { isOverCart }, dropInCart ] = useDrop(() => ({
    accept: 'product',
    drop: (item) => addProductToCart(item.id),
    collect: (monitor) => ({
      isOverCart: !!monitor.isOver(),
    })
  }));

  const shoppingList = 
  <div className={styles.grocery__list} >
      {vegetables && 
        <div className={styles.grocery__task}> 
          <p><FontAwesomeIcon icon={faCarrot} /> Warzywa:</p>
          <div className={clsx(styles.grocery__color, styles.grocery__vege)}>
            <p>{vegetables[0]} </p>
          </div>
        </div>
      }
      {fruits &&
        <div className={styles.grocery__task}>
          <p><FontAwesomeIcon icon={faAppleWhole} /> Owoce:</p>
          <div className={clsx(styles.grocery__color, styles.grocery__fruit)}>
            <p>{fruits[0]}</p>
          </div>
        </div>
      }
  </div>

  const addProductToCart = (id) => {
    const productList = utils.shop.filter( product => id === product.id);
    setCart( (cart) => [ productList[0], ...cart ]);
  };

  const deleteProductFromCart = ([ product ]) => {
    setCart(cart.filter( item => !product.item ))
  }

  const handleCart = () => {
    setOpen(!open);
    console.log('koszyk', open);
  }

  const root = document.querySelector(':root');
  root.style.setProperty('--colorVege', vegetables[1]);
  root.style.setProperty('--colorFruit', fruits[1]);

  console.log('hidden ', hidden);
  return(
    <div className={styles.grocery}>
      <ActivePlayer />
      { !hidden && 
          <Tips 
            content={<p>Wciśnij start i zobacz swoją listę zakupów. Przeczytaj jakiego koloru i ile warzyw oraz owoców należy kupić. Warzywa i owoce przeciągaj ze sklepowej półki prosto do koszyka. Produkty mogą się powtarzać. Gdy do koszyka wrzucisz więcej produktów niż chcesz kupić, można je skasować naciskając ikonę kosza. Jeśli chcesz zakończyć zakupy kliknij przycisk OK. </p>} 
            onClick={() => setTip(!tip)}
            tip={tip}
          /> 
        }

      { !hidden && <Button
        content='Start'
        name='setupBtn'
        onClick={() => utils.setGameTurn(setFruits, setVegetables, setHidden)}
      />}
      { hidden && <section className={styles.grocery__board}>
        <div className={clsx(styles.grocery__shopElement, styles.grocery__list)}>
          <div className={styles.grocery__icon}><FontAwesomeIcon icon={faList} /></div>
          {
            fruits.length
            ? 
            shoppingList
            : 
            null}
        </div>
        <div className={clsx(styles.grocery__shopElement, styles.grocery__cart, open && styles.open )} ref={dropInCart} >
          <div className={clsx(styles.grocery__icon, styles.grocery__cartIcon)} onClick={handleCart}>
            <FontAwesomeIcon icon={faShoppingBasket} />
            <div className={styles.grocery__counter}> { cart?.length } </div>
          </div>
          {cart?.map( ( cartProduct ) => 
            <div key={uniqid()} className={styles.grocery__cartProduct}>
              <GroceryProduct product={cartProduct} size='40px' />
              <p>{cartProduct.name}</p>
              <button 
                className={styles.grocery__delete}
                onClick={() => deleteProductFromCart(cart.splice(cart.indexOf(cartProduct), 1))}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          )}
        </div>
        <div className={clsx(styles.grocery__shopElement, styles.grocery__shop)}>
          <div className={styles.grocery__icon}>
            <FontAwesomeIcon icon={faShop} />
          </div>
          {utils.shop.map( product => 
            <GroceryProduct key={product.id} product={product} />
          )}
        </div>
      </section> }
      { cart?.length > 0 && <ButtonOK onClick={(e) => utils.submitSolution(e, vegetables, fruits, cart, activePlayer, updatePlayer, setCart, setFruits, setVegetables, setHidden)}/>}
    </div>
  )
};

export default GameGrocery;