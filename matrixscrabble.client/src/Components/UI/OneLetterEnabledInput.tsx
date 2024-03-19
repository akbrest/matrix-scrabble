import React, { useEffect, useState } from "react";

interface OneLetterEnabledInputProps {
    language: string;
    UpdateField: (x: number, y: number, type: string, value: string) => void;
    x: number;
    y: number;
    board: any;
}

const AllowedLetters = [{
    "En": "AaBbCcDdEeFfGgHIihJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"
}, {
    "Ru": "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя"
}]

const OneLetterEnabledInput: React.FC<OneLetterEnabledInputProps> = ({ x, y, language, UpdateField, board }) => {
    const [lang] = useState(language);
    const [value, setValue] = useState("");


    useEffect(() => {
        if (board != null) {
            var items = board.center;
            var item = items[x][y];
            setValue(item);
        }
    }, []); // empty array means only once

    const textInput = React.createRef();

    function checkValidity(e: any) {
        const elem = e.key;

        let letters = "";
        AllowedLetters.map((value, index) => {

            if (Object.keys(value)[index] == lang) {
                letters = Object.values(value)[index];
            }
        });

        if (letters.indexOf(elem) < 0) {

            if (elem == "Delete" || elem == "Backspace") {

            } else {
                e.preventDefault();
            }
        }
      
        setValue(elem)
       
        UpdateField(x, y, "main", elem);
        return;
    }

    return <div className="one-symbol-enabled-block">
        <input ref={textInput} 
            onChange={() => { }}
            onKeyDown={(e) => checkValidity(e)}
            maxLength={1}
            className="simpleInput"
            type="text"
            size={1}
            value={value}
        />
    </div>

};
export default OneLetterEnabledInput;
