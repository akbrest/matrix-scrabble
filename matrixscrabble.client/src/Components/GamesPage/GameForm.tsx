import { useState } from 'react';
import {
  EnglishAlphabetRegex,
  RussianAlphabetRegex,
  Language,
} from '../../constants';

const GameForm = () => {
  const [language, setLanguage] = useState(Language.EN);
  const [word, setWord] = useState('');

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
      alert(
        'Game ' + JSON.stringify({ lang: language, word: word }) + ' created!'
      );
      setWord('');
    }
  };

  return (
    <div>
      <h2>Create a new game</h2>
      <form onSubmit={handleSubmith}>
        <div>
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

          <label htmlFor="title">Word: </label>
          <input
            type="text"
            id="word"
            value={word}
            onChange={handleChangeWord}
          />
          {/* Todo create enum for radio buttons */}
          {/* Todo enum for radio buttons */}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default GameForm;
