import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { Answer } from "../../redux/models/Answer";
import Button from "react-bootstrap/esm/Button";
import { updateAnswer } from "../../redux/slices/gamesSlice";
import { confirmWord } from "../../redux/actions/gamesActions";
import { ConfirmWordRequest } from "../../redux/models/ConfirmWordRequest";
import { AppDispatch } from "../../redux/store";
import {
  AnswerField,
  EnglishAlphabetRegex,
  RussianAlphabetRegex,
  Language,
} from "../../constants";

const NewGameBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const game = useSelector((state: RootState) => state.games.currentGame.game);

  const wordArray = game.word.split("");
  const reverseWordArray = game.word.split("").reverse();
  const leftRightInputMaxSize = 5;
  const centerSize = wordArray.length - 2;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, key: string) => {
    e.preventDefault();

    const confirmWordRequest: ConfirmWordRequest = {
      gameId: game.id,
      wordOrderId: key,
      answer: game.gameBoard[key],
    };

    dispatch(confirmWord(confirmWordRequest));
  };

  const setAnswer = (key: string, field: AnswerField, value: string) => {
    let regex = EnglishAlphabetRegex;
    if (game.language === Language.Ru) regex = RussianAlphabetRegex;

    if (value.match(regex) != null)
      dispatch(updateAnswer({ key, field, value }));
  };

  return (
    <>
      {Object.keys(game.gameBoard).map((key: string, index: number) => {
        const item: Answer = game.gameBoard[key];
        return (
          <div key={key} className="mb-1">
            <form onSubmit={(e) => handleSubmit(e, key)} className="d-flex">
              <input
                type="text"
                value={item.left}
                onChange={(e) =>
                  setAnswer(key, AnswerField.Left, e.target.value)
                }
                maxLength={leftRightInputMaxSize}
                size={leftRightInputMaxSize}
                disabled={game.isCompleted}
              />
              <input type="text" value={wordArray[index]} size={1} disabled />
              <input
                type="text"
                value={item.center}
                onChange={(e) =>
                  setAnswer(key, AnswerField.Center, e.target.value)
                }
                maxLength={centerSize}
                size={centerSize}
                disabled={game.isCompleted}
              />
              <input
                type="text"
                value={reverseWordArray[index]}
                size={1}
                disabled
              />
              <input
                type="text"
                value={item.right}
                onChange={(e) =>
                  setAnswer(key, AnswerField.Right, e.target.value)
                }
                maxLength={leftRightInputMaxSize}
                size={leftRightInputMaxSize}
                disabled={game.isCompleted}
              />
              <Button
                type="submit"
                variant="primary"
                className="mx-2"
                disabled={game.isCompleted || game.gameBoard[key].isLoading}
              >
                {game.gameBoard[key].isLoading ? "Loading" : "Confirm"}
              </Button>
              {item.score !== null && <div>Score: {item.score}</div>}
            </form>
          </div>
        );
      })}
    </>
  );
};

export default NewGameBoard;
