import { useState } from 'react';
import { useDrag, useDrop } from "react-dnd";

import styles from './NonFound.module.scss' 

const NonFound = () => {

  const [ boxA, setBoxA ] = useState([]);
  const [ boxB, setBoxB ] = useState([]);


  const [ { isDraggingS }, square ] = useDrag({
    item: { name: 'kółeczko' },
    type: 'square',
    collect: monitor => ({
      isDraggingS: !!monitor.isDragging(),
    })
  });

  const [ { isDraggingC }, circle ] = useDrag({
    type: 'circle',
    item: { name: 'kółko' },
    collect: monitor => ({
      isDraggingC: !!monitor.isDragging(),
    })
  });

  const [ { isOverB }, dropB ] = useDrop({
    accept: 'square',
    collect: monitor => ({
      isOverB: !!monitor.isOver(),
    })
  })

  const [ { isOverA }, dropA ] = useDrop({
    accept: 'circle',
    drop: (item) => addCircle(item.name),
    collect: monitor => ({
      isOverA: !!monitor.isOver(),
    })
  });

  const addCircle = (name) => {
    console.log('circle', name);
    setBoxA([...boxA, name]);
    console.log(boxA);
  }


  const rainbow = [];

  for (let i = 1; i <= 7; i++) {
    const rainbowStripe = {
      id: i,
    }
    rainbow.push(rainbowStripe)
  }

  console.log('tęcza', rainbow);

  return(
    <div style={ { display: 'flex', gap: '20px' } }>
      <div ref={dropA} style={ { width: '200px', backgroundColor: isOverA ? 'tomato' : 'orange', height: '300px' } }>
        <h1>A Kółka do mnie!</h1>
        {boxA.map( item => <div style={ { width: '100px', backgroundColor: 'lightblue', height: '100px', margin: '10px', borderRadius: '50%' } }></div>)}
      </div>
      <div ref={dropB} style={ { width: '200px', backgroundColor: isOverB ? 'fuchsia' : 'pink', height: '300px' } } >
        <h1>B Miejsce dla kwadratów</h1>
      </div>
      <div ref={square} style={ { width: '100px', backgroundColor: 'lightblue', height: '100px', margin: '10px' } }></div>
      <div ref={circle} style={ { width: '100px', backgroundColor: 'lightblue', height: '100px', margin: '10px', borderRadius: '50%' } }></div>

      <div className={styles.rainbow}>
        {
          rainbow.map( stripe => 
            <div 
              key={stripe.id} 
              className={styles.rainbow__stripe} 
            > 
              {stripe.id} 
            </div>)
        }
      </div>
    </div>
  );
};

export default NonFound;