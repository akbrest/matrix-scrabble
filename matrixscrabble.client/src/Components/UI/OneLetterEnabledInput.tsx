import React, { useState } from "react";

interface OneLetterEnabledInputProps {
    language: string;
    UpdateField: (x: number, y: number, type: string, value: string) => void;
    x: number;
    y: number;
}

const AllowedLetters = [{
    "en": "AaBbCcDdEeFfGgHIihJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"
}, {
    "ru": "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя"
}]

const OneLetterEnabledInput: React.FC<OneLetterEnabledInputProps> = ({ x, y, language, UpdateField }) => {
    const [lang] = useState(language);
    const [value, setValue] = useState("");

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

        setValue(elem);

        return;
    }

    return <div className="one-symbol-enabled-block">
        <input
            onChange={() => UpdateField(x, y, "main", value)}
            onKeyDown={(e) => checkValidity(e)}
            maxLength={1}
            className="simpleInput"
            type="text"
            size={1}
        />
    </div>

};
export default OneLetterEnabledInput;
