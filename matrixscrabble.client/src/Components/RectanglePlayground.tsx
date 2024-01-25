import WordForm from './WordForm';
import DictionaryService from '../Services/DictionaryService';
import RussianService from '../Services/RussianService';
//import EnglishService from '../Services/EnglishService';
import React from 'react';

interface RectanglePlaygroundProps {
    word: string;
}

//const TestEnglish = (e) => {
//    var item = {
//        word: 'Man',
//        length: 'Man'.length,
//        status: '',
//    };

//    var item2 = {
//        word: 'Red',
//        length: 'Red'.length,
//        status: '',
//    };

//    var item3 = {
//        word: 'Onion',
//        length: 'Onion'.length,
//        status: '',
//    };

//    var item4 = {
//        word: 'asdlsadksad',
//        length: 'asdlsadksad'.length,
//        status: '',
//    };

//    const items = [item, item2, item3, item4];

//    dictionaryService.CheckWords(items);

//    console.log(items);
//};

const TestRussian = () => {
    const item = {
        word: '����������',
        length: '����������'.length,
        status: '',
    };

    const item2 = {
        word: '�����',
        length: '�����'.length,
        status: '',
    };

    const items = [item, item2];

    dictionaryService.CheckWords(items);

    console.log(items);
};

const apiService = new RussianService();

const dictionaryService = new DictionaryService(apiService);

const RectanglePlayground: React.FC<RectanglePlaygroundProps> = ({ word }) => {
    const letters = word.toUpperCase().split('');
    const reversedLetters = letters.slice().reverse();
    console.log(letters);
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
