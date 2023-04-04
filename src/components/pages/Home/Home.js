import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PlayerIcon from '../../views/PlayerIcon/PlayerIcon';
import styles from '../Home/Home.module.scss';
import AddPlayerForm from '../../features/AddPlayerForm/AddPlayerForm';
import { getPlayersAsync } from '../../../redux/player/playerSlice';
import { useEffect } from 'react';
import PlayersList from '../PlayersList/PlayersList';
import CurrentPlayer from '../../features/CurrentPlayer/CurrentPlayer';
// import { useGetPlayersQuery } from '../../../redux/apiSlice/apiSlice';
// API - pobieranie obiektów-graczy do magazynu - playerSlice

const Home = () => {

  

  return(
  <>
    <PlayersList />
    <AddPlayerForm />
  </>

  );
};

export default Home;