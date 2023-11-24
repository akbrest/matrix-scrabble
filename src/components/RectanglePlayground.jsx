import React from 'react';
import WordForm from './WordForm';

const RectanglePlayground = ({ word }) => {
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
