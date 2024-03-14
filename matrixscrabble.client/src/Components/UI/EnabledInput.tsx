import React, { useEffect, useState } from "react";

interface OneLetterEnabledInputProps {
    language: string;
    UpdateField: (x: number, y: number, type: string, value: string) => void;
    row: number;
    type: string;
    board: any
}

const AllowedLetters = [
    { "en": "AaBbCcDdEeFfGgHIihJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz" },
    { "ru": "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя" }
]

const EnabledInput: React.FC<OneLetterEnabledInputProps> = ({ row, type, language, UpdateField, board }) => {

    const [lang] = useState(language);
    const [rowValue] = useState(row);
    const [typeX] = useState(type);
    const [value, setValue ] = useState('');
    const textInput = React.createRef();
 

    useEffect(() => {
        if (type == 'left' && board != null) {
            var items = board.left;
            var item = items[row];
            console.log('dddd')
            setValue(item);
            //textInput.current.value = value;
        }
    }, []); // empty array means only once

   

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
        setValue(elem);


        return;
    }

    return <div className="symbols-enabled-block">
        <input ref={textInput}
            onChange={() => UpdateField(rowValue, 0, typeX, textInput.current.value)}
            onKeyDown={(e) => CheckValidity(e)}
            className="simpleInput"
            type="text"
            value={value}
        />
    </div>
}


export default EnabledInput;