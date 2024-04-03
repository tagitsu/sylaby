import { db } from '../firebase-config';
import { query, onSnapshot, collection, doc, getDoc, updateDoc, where } from 'firebase/firestore';

const appUtils = {};

// appUtils.getPlayersFromUser = (userId, setPlayers) => {
//   const q = query(collection(db, 'users', `${userId}`, 'players'));
//   onSnapshot(q, (querySnapshot) => {
//     const players = [];
//     querySnapshot.forEach((doc) => {
//       players.push(doc.data())
//     });
//     setPlayers(players);
//   })
// };

appUtils.aboutText = 'Czym jest sylaba wie każdy, ale czy tak łatwo jest to wytłumaczyć przedszkolakowi? Okazuje się, że nie do końca. Niektórzy badacze próbują badać powstawanie sylab i opisują jako fizjologiczne zjawisko towarzyszące mówieniu i odbierane przez nas jako zmiany intensywności i donośności głosu. Inni definiują sylabę jako najmniejszą samodzielną jednostkę fonetyczną i zastanawiają się nad tym czemu sylaby mają w ogóle służyć. Sylaby dzielą wyrazy na części, sprawiają że wypowiadane słowa i zdania, całe wypowiedzi, nie są nużące ani dla mówiącego, ani dla jego słuchaczy. Dzieci rozpoznają sylaby globalnie i już w przedszkolu większość z nich potrafi dzielić wyrazy na sylaby. Nauka sylabizowania nastawiona głównie na słuchanie przez dzieci wolno wymawianych wyrazów, często połączona jest z zabawami ruchowymi, jak klaskanie, skakanie czy dotykanie podbródkiem swojej rączki przy każdej sylabie wymawianego słowa.Umiejętność sylabizowania jest wstępem do wielu umiejętności potrzebnych w późniejszych etapach edukacji takich jak nauka czytania, poprawne literowanie wyrazów, nauka pisania (rozdzielanie wyrazu przy przenoszeniu do następnego wiersza). Ułatwia też wymawianie nowych, trudnych lub bardzo długich słów.Zachęcamy do pobawienia się z dziećmi sylabami, czytajcie, dopasowujcie sylaby do siebie, układajcie słowa, tłumaczcie ich znaczenie. Możecie razem spędzić czas na nauce nawet tego nie zauważając i dobrze się bawiąc.';

appUtils.getAboutContent = () => {
  return (<div>
    <header>Jak rozłożyć słowo na sylaby wie każdy, ale czy tak łatwo jest wytłumaczyć przedszkolakowi czym taka sylaba jest? Okazuje się, że nie do końca. </header>
    <h3>Naukowe podejście</h3>
    <p>Niektórzy badacze próbują badać powstawanie sylab i opisują jako fizjologiczne zjawisko towarzyszące mówieniu i odbierane przez nas jako zmiany intensywności i donośności głosu. Inni definiują sylabę jako najmniejszą samodzielną jednostkę fonetyczną i zastanawiają się nad tym czemu sylaby mają w ogóle służyć. Sylaby dzielą wyrazy na części, sprawiają że wypowiadane słowa i zdania, całe wypowiedzi, nie są nużące ani dla mówiącego, ani dla jego słuchaczy. </p>
    <h3>A co na to dzieci?</h3>
    <p>Dzieci rozpoznają sylaby globalnie i już w przedszkolu większość z nich potrafi dzielić wyrazy na sylaby. Nauka sylabizowania nastawiona głównie na słuchanie przez dzieci wolno wymawianych wyrazów, często połączona jest z zabawami ruchowymi, jak klaskanie, skakanie czy dotykanie podbródkiem swojej rączki przy każdej sylabie wymawianego słowa.</p>
    <h3>Dla kogo jest nasza gra?</h3>
    <p>Mogą w nią grać już przedszkolaki ze wpsarciem rodziców. Dorosły czyta sylaby a dziecko próbuje wymyślić wyraz łącząc przeczytane sylaby w słowa.</p>
    <p>Dzieci rozpoczynające naukę czytania mogą już grać samodzielnie.</p>
    <h3>Co nam daje nauka sylabizowania?</h3>
    <p>Umiejętność sylabizowania jest wstępem do wielu umiejętności potrzebnych w późniejszych etapach edukacji takich jak nauka czytania, poprawne literowanie wyrazów, nauka pisania (rozdzielanie wyrazu przy przenoszeniu do następnego wiersza). Ułatwia też wymawianie nowych, trudnych lub bardzo długich słów.</p>
    <p>Zachęcamy do pobawienia się sylabami z dziećmi ,czytajcie, dopasowujcie sylaby do siebie, układajcie słowa, tłumaczcie ich znaczenie. Możecie razem spędzić czas na nauce nawet tego nie zauważając i dobrze się bawiąc.</p>
  </div>)
};

appUtils.getInstructions = () => {
  return(
    <div>
        <h2>Dopasuj sylabę</h2>
        <p>Po naciśnięciu przycisku start pojawia się sylaba do której należy dopasować drugą tak, aby stworzyły istniejące słowo. Jeśli słowo istnieje w słowniku zaznaczone jest na zielono, a jeśli nie wyświetli się czerwone tło.</p>
        <h2>Stwórz pary</h2>
        <p>Przeciągaj sylaby z pudełka na półki tworząc jak najwięcej wyrazów.</p>
    </div>
  )
};

appUtils.getPlayerFromUser = async (userId, setPlayer) => {

  const docRef = doc(db, 'users', `${userId}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    //console.log("Document data:", docSnap.data());
    setPlayer(docSnap.data());
  } else {
    //console.log("No such document!");
  }
};

appUtils.getPointsFromUser = async (userId, setPoints) => {

  onSnapshot(doc(db, 'users', `${userId}`), (doc) => {
    console.log("points: ", doc.data().points);
    setPoints(doc.data().points);
  })

  // if (docSnap.exists()) {
  //   const player = docSnap.data();
  //   console.log("Document data:", player);
  //   //setPoints(docSnap.data());
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log("No such document!");
  // }
};


// appUtils.getActivePlayer = (userId, setActivePlayer) => {
//   const q = query(collection(db, 'users', `${userId}`, 'players'), where( 'isActive', '==', true ));
//   onSnapshot(q, (querySnapshot) => {
//     let activePlayer;
//     querySnapshot.forEach( (doc) => {
//       activePlayer = doc.data();
//       setActivePlayer(activePlayer);
//     });
//   })
// }

// appUtils.inactiveAllPlayers = (players, userId) => {
//   players?.map( (player) => {
//     const playerRef = doc(db, 'users', `${userId}`, 'players', `${player.id}`);
//     updateDoc(playerRef, { isActive: false })
//   })
// };

appUtils.refreshPage = () => {
  window.location.reload(false);
};


export default appUtils;