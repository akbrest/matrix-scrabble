import React, { useState } from "react";
import { EnglishAlphabetRegex, RussianAlphabetRegex } from "../../constants";

interface OneLetterEnabledInputProps {
    language: string;
    UpdateField: (x: number, y: number, type: string, value: string) => void;
    row: number;
    type: string
}

const AllowedLetters = [
    { "en": "AaBbCcDdEeFfGgHIihJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz" },
    { "ru": "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя" }
]

const EnabledInput: React.FC<OneLetterEnabledInputProps> = ({ row, type, language, UpdateField }) => {

    const [lang] = useState(language);
    const [rowValue] = useState(row);
    const [typeX] = useState(type);
    const textInput = React.createRef();

    function CheckValidity(e: React.KeyboardEvent<HTMLInputElement>): void {
        const elem = e.key;

        let letters = "";
        AllowedLetters.map((value, index) => {
            if (Object.keys(value)[index] == lang) {
                letters = Object.values(value)[index];
            }
        });

        if (letters.indexOf(elem) < 0) {
            if (elem == "Delete" || elem == "Backspace") {
                    // TODO fix for backspaces and delete 
            } else {
                e.preventDefault();
            }
        }

        return;
    }

    return <div style={{ width: '100px' }}>
        <input ref={textInput}
            onChange={() => UpdateField(rowValue, 0, typeX, textInput.current.value)}
            onKeyDown={(e) => CheckValidity(e)}
            className="simpleInput"
            type="text"
        />
    </div>
}


export default EnabledInput;