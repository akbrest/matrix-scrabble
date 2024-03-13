import EnabledInput from "./UI/EnabledInput";
import OneLetterDisabledInput from "./UI/OneLetterDisabledInput";
import OneLetterEnabledInput from "./UI/OneLetterEnabledInput";
import React, { useState } from "react";
import { FaCheck } from 'react-icons/fa';
import { FaBeer } from 'react-icons/fa';

interface WordForm {
    middleSubwordLength: number;
    word: string;
    confirmation: boolean;
    language: string;
    x: number;
    y: number;
    UpdateField: (x: number, y: number, type: string, value: string) => void;
    firstLetter: string;
    lastLetter: string;
}

const WordFormClass: React.FC<WordForm> = ({ x, language, UpdateField, firstLetter, lastLetter, middleSubwordLength, confirmation }) => {
    const [lang] = useState(language);

    const items = [""];

    let condition = 0;
    while (condition < middleSubwordLength - 1) {
        items.push("");
        condition++;
    }

    return <div className="game-field-line">
        <div className="game-field-line-left">
            <EnabledInput
                key={"FooClass_"}
                UpdateField={UpdateField}
                language={lang}
                type={'left'}
                row={x}
            />
        </div>
        <div className="game-field-line-center">
            <OneLetterDisabledInput letter={firstLetter} />
            {items.map(({ }, index) => {
                return (
                    <OneLetterEnabledInput
                        key={"FooClass" + index}
                        UpdateField={UpdateField}
                        language={lang}
                        x={x}
                        y={index}
                    />
                );
            })}
            <OneLetterDisabledInput letter={lastLetter} />
        </div>
        <div className="game-field-line-right">
            <EnabledInput
                key={"FooClass_"}
                UpdateField={UpdateField}
                language={lang}
                type={'right'}
                row={x}
            />
            <div className="confirmation-block">
                <span >
                    {confirmation ? (
                        <FaCheck />
                    ) : (
                        <FaBeer />
                    )}
                </span>
            </div>
        </div>
    </div>
};

export default WordFormClass;
