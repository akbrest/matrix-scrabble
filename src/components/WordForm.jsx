import React from 'react';
import { useState } from 'react';
import OneLetterDisabledInput from './UI/OneLetterDisabledInput';

const WordForm = ({ firstLetter, lastLetter, middleSubwordLength }) => {
  const [firstSubword, setFirstSubword] = useState('');
  const [middleSubword, setMiddleSubword] = useState('');
  const [lastSubword, setLastSubword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const farInputMaxSize = 5;

  const handleSubmith = (e) => {
    e.preventDefault();

    if (middleSubword) setIsDisabled(true);
    else alert('You must enter a value in the middle input!');
  };

  return (
    <form onSubmit={handleSubmith}>
      <input
        type="text"
        value={firstSubword}
        onChange={(e) => setFirstSubword(e.target.value.toUpperCase())}
        maxLength={farInputMaxSize}
        size={farInputMaxSize}
        disabled={isDisabled}
      />
      <OneLetterDisabledInput letter={firstLetter} />
      <input
        type="text"
        value={middleSubword}
        onChange={(e) => setMiddleSubword(e.target.value.toUpperCase())}
        maxLength={middleSubwordLength}
        size={middleSubwordLength}
        disabled={isDisabled}
      />
      <OneLetterDisabledInput letter={lastLetter} />
      <input
        type="text"
        value={lastSubword}
        onChange={(e) => setLastSubword(e.target.value.toUpperCase())}
        maxLength={farInputMaxSize}
        size={farInputMaxSize}
        disabled={isDisabled}
      />
      <button type="submith" className="ml-20" disabled={isDisabled}>
        Confirm
      </button>
    </form>
  );
};

export default WordForm;
