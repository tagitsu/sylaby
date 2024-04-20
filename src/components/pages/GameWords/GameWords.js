import { useState } from 'react';
import styles from './GameWords.module.scss';
import { useGetSyllablesQuery } from "../../../api/apiSlice";

const GameWords = ({ player }) => {

  const { data: syllables } = useGetSyllablesQuery();
  const [ syllable1, setSyllable1 ] = useState('');
  const [ syllable2, setSyllable2 ] = useState([]);
  const [ words, setWords ] = useState([]);
  const [ answer, setAnswer ] = useState('');
  const [ showResult, setShowResult ] = useState('');

  return(
      <div className={styles.words} >
        <p>Tu będzie gra polegająca na tworzeniu jak największej ilości wyrazów z wylosowanych sylab</p>
      </div>
  );
};

export default GameWords;