import WordForm from "./GamesPage/WordForm";
// import EnglishService from "../Services/EnglishService";

type Props = {
  word: string;
}

const RectanglePlayground = ({ word }: Props) => {
  const letters = word.toUpperCase().split('');
  const reversedLetters = letters.reverse();
  const countDisabledLetters = 2;

  return (
    <div>
      {letters.map((element, index) => {
        return (
          <WordForm
            key={index}
            firstLetter={element}
            lastLetter={reversedLetters[index]}
            middleSubwordLength={word.length - countDisabledLetters}
          />
        );
      })}
    </div>
  );
};

export default RectanglePlayground;