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
import { fetchWord } from '../../redux/actions/wordActions';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { FaBan } from 'react-icons/fa';
import { CreateGame } from '../../redux/models/CreateGame';
import Pagination from 'react-bootstrap/esm/Pagination';

const GameForm = () => {
    const [language, setLanguage] = useState(Language.EN);
    const [word, setWord] = useState('');
    const [status, setStatus] = useState(false);
    const [active, setActive] = useState(5);
    const [randomLength, setRandomLength] = useState(5);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const [isRandom, setIsRandom] = useState(false);
    // const errorMessage = useSelector(selectErrorMessage);

    const disableButton = () => {
        setButtonDisabled(true);
    };

    const enableButton = () => {
        setButtonDisabled(false);
    };

    const handleRandomChange = () => {

        setIsRandom(!isRandom);

        if (!isRandom) {
            enableButton();
            setStatus(true);
        } else {
            disableButton();
            setStatus(false);

        }
        setWord(''); // Clear input field when switching to random
    };

    const handleChangeWord = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let regex = EnglishAlphabetRegex;
        if (language === Language.RU) regex = RussianAlphabetRegex;

        if (e.target.value.match(regex) != null) {
            setWord(e.target.value);
        }

        let status = false;
        if (e.target.value !== "") {
            status = (await dispatch(fetchWord({ language: language, word: e.target.value }))).payload as boolean;
        } else {
            status = false;
        }

        setStatus(status);

        if (status)
            enableButton()
        else
            disableButton();
    };

    const handleChangeLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedLanguage: Language = e.target.value as Language;

        if (language !== selectedLanguage) setWord('');

        setLanguage(selectedLanguage);
    };

    const changeAmount = (value: number) => {
        setActive(value);
        setRandomLength(value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (word || true) {

            const creatGame: CreateGame = {
                language: language,
                word: word,
                length: randomLength,
                random: isRandom
            };

            const createdGame = (await dispatch(createGame(creatGame))).payload as Game;

            if (createdGame.id != null) {
                navigate('/games/' + createdGame.id);
            }
        }
    };

    return (
        <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <div className="form-block-main">
                    <form onSubmit={handleSubmit} className="form-create">
                        <label htmlFor="language">Language:</label>
                        <div className="flex form-block">
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
                        <div className="flex">
                            <div>
                                <Form.Check
                                    type="radio"
                                    id="input-word"
                                    name="word-option"
                                    value="input"
                                    checked={!isRandom}
                                    onChange={handleRandomChange}
                                /></div>
                            <div>
                                <label className="form-label">Input Word:</label>
                            </div>
                        </div>
                        <div className="create-word">
                            <input
                                type="text"
                                id="word"
                                value={word}
                                onChange={handleChangeWord}
                                disabled={isRandom} // Disable input if random is selected
                                placeholder="Enter a word" // Placeholder text for input field
                            />
                            <span className="absolute-create-form">
                                {status ? (
                                    <span className="form-page-icon-ok">
                                        <FaCheck />
                                    </span>
                                ) : (
                                    <span className="form-page-icon-err">
                                        <FaBan />
                                    </span>
                                )}</span>
                        </div>
                        <br />
                        <div className="flex bottom">
                            <div>
                                <Form.Check
                                    type="radio"
                                    id="random-word"
                                    name="word-option"
                                    value="random"
                                    checked={isRandom}
                                    onChange={handleRandomChange}
                                />
                            </div>
                            <div>
                                <label className="form-label">Random Word:</label>
                            </div>
                        </div>
                        {isRandom ? (
                            <div className="create-form-block-length">
                                <div>
                                    <label htmlFor="Length">Length:</label>
                                </div>
                                <div className="form-label">
                                    <Pagination >
                                        <Pagination.Item active={3 === active} onClick={() => changeAmount(3)}>{3}</Pagination.Item>
                                        <Pagination.Item active={4 === active} onClick={() => changeAmount(4)}>{4}</Pagination.Item>
                                        <Pagination.Item active={5 === active} onClick={() => changeAmount(5)}>{5}</Pagination.Item>
                                        <Pagination.Item active={6 === active} onClick={() => changeAmount(6)}>{6}</Pagination.Item>
                                        <Pagination.Item active={7 === active} onClick={() => changeAmount(7)}>{7}</Pagination.Item>
                                    </Pagination>
                                </div></div>
                        ) : (<div></div>)}

                        <button type="submit" disabled={isButtonDisabled ? true : false} className={isButtonDisabled ? "disabledButton btn-disabled" : "enabledButton btn-enabled"}>Start Game</button>
                    </form>
                </div>
            </Form.Group>
        </div>
    );
};

export default GameForm;
