import React from 'react';
import WordForm from './WordForm';
import DictionaryService from '../Services/DictionaryService';
import RussianService from '../Services/RussianService';
import EnglishService from '../Services/EnglishService';


const TestEnglish = (e)  =>{
  
    var item =  {
      word: 'Man',
      length: 'Man'.length,
      status : ""
    };

    var item2 =  {
      word: 'Red',
      length: 'Red'.length,
      status : ""
    };

    var item3=  {
      word: 'Onion',
      length: 'Onion'.length,
      status : ""
    };

    var item4 =  {
      word: 'asdlsadksad',
      length: 'asdlsadksad'.length,
      status : ""
    };

    const items = [item, item2, item3, item4];

    dictionaryService.CheckWords(items);

    console.log(items);

}


const TestRussian = (e)  => {

    var item =  {
        word: 'Катастрофа',
        length: 'Катастрофа'.length,
        status : ""
      };

      var item2 =  {
        word: 'вывфв',
        length: 'вывфв'.length,
        status : ""
      };

      const items = [item, item2];

      dictionaryService.CheckWords(items);

    console.log(items);
}

const apiService = new RussianService();

const dictionaryService = new DictionaryService(apiService);

const RectanglePlayground = ({ word}) => {
  const letters = word.toUpperCase().split('');
  const reversedLetters = letters.reverse();
  const countDisabledLetters = 2;

  return (
    <div>     
      <button type="submit" className="ml-20" onClick={TestRussian}>
      Confirm 
  </button>
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
