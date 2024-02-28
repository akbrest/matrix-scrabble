//import React, { useState } from "react";

//interface OneLetterDisabledInputProps {
//    language: string;
//    UpdateField: (x: number, y: number, type: string, value: string) => void;
//    x: number;
//    y: number;
//}

//const AllowedLetters = {
//    'en': "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuWwVvXxYYZz",
//    'ru': "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя"
//}

//const OneLetterEnabledInput: React.FC<OneLetterDisabledInputProps> = ({x, y,  language, UpdateField }) => {
//    const [lang, setLanguage] = useState(language);
//    const [value, setValue] = useState("");
//    const [xx, setX] = useState(x);
//    const [yy, setY] = useState(y);

//    function checkValidity(e: any) {
//        var elem = e.key;
//        var allowedChars = AllowedLetters[lang];
        
//        if (allowedChars.indexOf(elem) >= 0) {
//            setValue(elem);
//        } else {
//            if (elem == "Delete" || elem == "Backspace") {

//            } else {
//                e.preventDefault();
//                return false;
//            }
//        }

//        return true;
//    }

//    return <div className="one-symbol-enabled-block">
//        <input
//            onChange={() => UpdateField(xx, yy, "main", value)}
//            onKeyDown={(e) => checkValidity(e)}
//            maxLength={1}
//            className="simpleInput"
//            type="text"
//            size={1}
//        />
//    </div>

//};
//export default OneLetterEnabledInput;
