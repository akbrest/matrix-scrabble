
import React, { useState } from "react";
import WordFormClass from "../Components/WordFormClass";

interface RectanglePlaygroundInterface {
    word: string;
    confirmation: boolean[];
    language: string;
    UpdateField: (x: number, y: number, type: string, value: string) => void;
}

const RectanglePlayground: React.FC<RectanglePlaygroundInterface> = ({ language, word, UpdateField, confirmation }) => {
    const [lang] = useState(language);

    if (word == null) {
        word = "";
    }
    const letters = word.toUpperCase().split("");
    const reversedLetters = letters.slice().reverse();
    const countDisabledLetters = 2;
    const confirmations = confirmation;
    return (
        <div>
            {letters.map((element, index) => {
                if (index === 0) {
                    return (
                        <WordFormClass
                            key={"WordFormClass" + index}
                            y={0}
                            x={index}
                            firstLetter={element}
                            lastLetter={reversedLetters[index]}
                            middleSubwordLength={word.length - countDisabledLetters}
                            UpdateField={UpdateField}
                            language={lang}
                            word={word}
                            confirmation={confirmations[index]}

                        />
                    );
                } else if (index === letters.length - 1) {
                    return (
                        <WordFormClass
                            key={"WordFormClass" + index}
                            y={index}
                            x={index}
                            UpdateField={UpdateField}
                            firstLetter={reversedLetters[0]}
                            lastLetter={letters[0]}
                            word={word}
                            language={lang}
                            middleSubwordLength={word.length - countDisabledLetters}
                            confirmation={confirmations[index]}
                        />
                    );
                } else {
                    return (
                        <WordFormClass
                            key={"WordFormClass" + index}
                            word={word}
                            UpdateField={UpdateField}
                            y={index}
                            x={index}
                            firstLetter={letters[index]}
                            lastLetter={reversedLetters[index]}
                            language={lang} 
                            middleSubwordLength={word.length - countDisabledLetters}
                            confirmation={confirmations[index]}
                        />
                    );
                }
            })}
        </div>
    );
}

export default RectanglePlayground;