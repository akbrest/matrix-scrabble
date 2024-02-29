/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

interface OneLetterEnabledInputProps {
    language: string;
    UpdateField: (x: number, y: number, type: string, value: string) => void;
    row: number;
    type: string
}

const AllowedLetters = {
    'en': "AaBbCcDdEeFfGgHIihJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",
    'ru': "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя"
}

const EnabledInput: React.FC<OneLetterEnabledInputProps> = ({ row, type, language, UpdateField }) => {
    const [lang] = useState(language);
    const [rowValue] = useState(row);
    const [typeX] = useState(type);
    const textInput = React.createRef();


    function CheckValidity(e: React.KeyboardEvent<HTMLInputElement>): void {
        const elem = e.key;
        const allowedChars = AllowedLetters[lang];
        if (allowedChars.indexOf(elem) < 0) 
        {
            if (elem == "Delete" || elem == "Backspace") {
                e.preventDefault();
                return;
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