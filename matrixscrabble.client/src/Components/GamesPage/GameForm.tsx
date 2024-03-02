import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  EnglishAlphabetRegex,
  RussianAlphabetRegex,
  Language,
} from '../../constants';
import { AppDispatch } from '../../redux/store';
import { Game } from '../../redux/models/Game';
import { createGame } from '../../redux/actions/gamesActions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const GameForm = () => {
  const [language, setLanguage] = useState(Language.EN);
  const [word, setWord] = useState('');
  const dispatch = useDispatch<AppDispatch>();

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
      const game: Game = {
        language: language,
        word: word,
      };

      dispatch(createGame(game));

      setWord('');
    }
  };

  return (
    <Form onSubmit={handleSubmith}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <div>
          <Form.Check
            inline
            type="radio"
            value={Language.EN}
            checked={language === Language.EN}
            onChange={handleChangeLanguage}
            label="English"
          />
          <Form.Check
            inline
            type="radio"
            value={Language.RU}
            checked={language === Language.RU}
            onChange={handleChangeLanguage}
            label="Russian"
          />
        </div>
        <Form.Control
          type="text"
          placeholder="Enter word"
          value={word}
          onChange={handleChangeWord}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default GameForm;
