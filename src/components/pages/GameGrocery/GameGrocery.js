import { useState } from "react";
import { useGetPlayersQuery, useUpdatePlayerMutation, useGetLevelsQuery } from "../../../api/apiSlice";

import ButtonOK from "../../common/ButtonOK/ButtonOK";
import Button from "../../common/Button/Button";
import ActivePlayer from "../../features/ActivePlayer/ActivePlayer";
import styles from './GameGrocery.module.scss';
import utils from '../../../utils/gameGroceryUtils';
import playerUtils from "../../../utils/playerUtils";
import GroceryProduct from "../../common/GroceryProduct/GroceryProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faShop, faList, faAppleWhole, faCarrot, faMultiply, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDrop } from "react-dnd";
import clsx from "clsx";

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

  const [{ isOverCart }, dropInCart] = useDrop(() => ({
    accept: 'product',
    drop: (item) => addProductToCart(item.id),
    collect: (monitor) => ({
      isOverCart: !!monitor.isOver(),
    })
  }));

  const shoppingList = 
  <div>
    <div>
      
      {vegetables && 
        <div className={styles.grocery__task}> 
          <h3><FontAwesomeIcon icon={faCarrot} /> Warzywa:</h3>
          <div>{vegetables[0]} </div>
          <FontAwesomeIcon icon={faMultiply} /> 
          <div className={clsx(styles.grocery__color, styles.grocery__vege)}></div>
        </div>
      }
    </div>
    <div>
      
      {fruits &&
        <div className={styles.grocery__task}>
          <h3><FontAwesomeIcon icon={faAppleWhole} /> Owoce:</h3>
          <div>{fruits[0]}</div>
          <FontAwesomeIcon icon={faMultiply} /> 
          <div className={clsx(styles.grocery__color, styles.grocery__fruit)}></div>
        </div>
      }
    </div>
  </div>



  const addProductToCart = (id) => {
    const productList = utils.shop.filter( product => id === product.id);
    setCart( (cart) => [...cart, productList[0]]);
  };

  const root = document.querySelector(':root');
  root.style.setProperty('--colorVege', vegetables[1]);
  root.style.setProperty('--colorFruit', fruits[1]);

  return(
    <div className={styles.grocery}>
      <ActivePlayer />
      <section className={styles.grocery__board}>
        <Button
          content='Co chcesz dzisiaj kupić?'
          onClick={() => utils.setGameTurn(setFruits, setVegetables)}
        />
        <div className={styles.grocery__shop}>
          <div className={clsx(styles.grocery__shopElement, styles.grocery__list)}>
            <h2><FontAwesomeIcon icon={faList} /></h2>
            {fruits.length ? shoppingList : null}
          </div>
          <div className={clsx(styles.grocery__shopElement, styles.grocery__cart)} ref={dropInCart} >
            <h2><FontAwesomeIcon icon={faShoppingBasket} /></h2>
            {cart.map( cartProduct => <GroceryProduct product={cartProduct} size='4rem' text={cartProduct.name} />)}
          </div>
          <div className={clsx(styles.grocery__shopElement, styles.grocery__assortment)}>
            <h2><FontAwesomeIcon icon={faShop} /></h2>
            {utils.shop.map( product => 
              <GroceryProduct key={product.id} product={product} />
            )}
          </div>
        </div>
        <ButtonOK onClick={(e) => utils.submitSolution(e, vegetables, fruits, cart, activePlayer, updatePlayer, setCart, setFruits, setVegetables)}/>
      </section>
    </div>
  )
};

export default GameGrocery;