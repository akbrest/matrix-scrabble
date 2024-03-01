import { useState } from 'react';
//import { useDispatch } from 'react-redux';
import {
  EnglishAlphabetRegex,
  RussianAlphabetRegex,
  Language,
} from '../../constants';

const GameForm = () => {
  const [language, setLanguage] = useState(Language.EN);
  const [word, setWord] = useState('');
  //const dispatch = useDispatch();

  const handleChangeWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    let regex = EnglishAlphabetRegex;
    if (language === Language.RU) regex = RussianAlphabetRegex;

    if (e.target.value.match(regex) != null) {
      setWord(e.target.value);
    }
  };

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedLanguage: Language = e.target.value as Language;

    if (language !== selectedLanguage) setWord('');

    setLanguage(selectedLanguage);
  };

  const handleSubmith = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (word) {
      const game = {
        language: language,
        word: word,
      };

      console.log(game);
      //dispatch(createGame(game));

      setWord('');
    }
  };

  return (
    <div>
      <h2>Create a new game</h2>
      <form onSubmit={handleSubmith}>
        <div className="mb-3 row">
          <legend>Select language:</legend>
          <div>
            <label>
              <input
                type="radio"
                value={Language.EN}
                checked={language === Language.EN}
                onChange={handleChangeLanguage}
              />
              English
            </label>
            <label>
              <input
                type="radio"
                value={Language.RU}
                checked={language === Language.RU}
                onChange={handleChangeLanguage}
              />
              Russian
            </label>
          </div>

          <label htmlFor="title" className="form-label">Word: </label>
          <input
            type="text"
            className="form-control"
            id="word"
            value={word}
            onChange={handleChangeWord}
          />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default GameForm;
