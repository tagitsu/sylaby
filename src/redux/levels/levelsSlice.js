import { createSlice } from '@reduxjs/toolkit';
import { faFaceSmile, faStar, faBell } from '@fortawesome/free-regular-svg-icons'; 
import { faGhost, faKiwiBird, faHelicopter, faFish, faShip } from '@fortawesome/free-solid-svg-icons';


const initialState = {
  levels: [
    {
      id: "1",
      value: 1,
      title: "",
      badge: faFaceSmile,
      xpToLvlUp: 10
    },
    {
      id: "2",
      value: 2,
      title: "",
      badge: faGhost,
      xpToLvlUp: 25
    },
    {
      id: "3",
      value: 3,
      title: "",
      badge: faStar,
      xpToLvlUp: 45
    },
    {
      id: "4",
      value: 4,
      title: "",
      badge: faBell,
      xpToLvlUp: 70
    },
    {
      id: "5",
      value: 5,
      title: "",
      badge: faKiwiBird,
      xpToLvlUp: 120
    },
    {
      id: "6",
      value: 6,
      title: "",
      badge: faHelicopter,
      xpToLvlUp: 180
    },
    {
      id: "7",
      value: 7,
      title: "",
      badge: faFish,
      xpToLvlUp: 260
    },
    {
      id: "8",
      value: 8,
      title: "",
      badge: faShip,
      xpToLvlUp: 400
    },
  ],
};

export const levelsSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {

  }
});

export default levelsSlice.reducer;