import styles from '../HowToPlay/HowToPlay.module.scss';

const HowToPlay = () => {

  return(
    <div className={styles.how}>
      <article className={styles.how__game}>
        <h1>Sylaby</h1>
        <h2>Poziom trudności: ** </h2>
        <h3>Wiek: 6+</h3>
        <p>Dopasuj do pierwszej sylaby drugą tak aby razem stworzyły słowo.</p>
      </article>
      <article className={styles.how__game}>
        <h1>Brakująca liczba</h1>
        <h2>Poziom trudności: *** </h2>
        <h3>Wiek: 7+</h3>
        <p>Wpisz taką liczbę żeby aby równanie było prawidłowe.</p>
      </article>
      <article className={styles.how__game}>
        <h1>Ile kropek?</h1>
        <h2>Poziom trudności: * </h2>
        <h3>Wiek: 5+</h3>
        <p>Policz kropki i wpisz prawidłową liczbę w ramkę.</p>
      </article>

    </div>
  );
};

export default HowToPlay;