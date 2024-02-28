//import React, { useState } from "react";

//interface OneLetterEnabledInputProps {
//    language: string;
//    UpdateField: (x: number, y: number, type: string, value: string) => void;
//    row: number;
//    type:string
//}

//const AllowedLetters = {
//    'en': "AaBbCcDdEeFfGgHIihJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",
//    'ru': "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя"
//}

//const AllLetters = ['а', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Д', 'д', 'Е', 'е', 'Ё', 'ё', 'Ж', 'ж', 'З', 'з', 'И', 'и', 'Й', 'й', 'К', 'к', 'Л', 'л', 'М', 'м', 'Н', 'н', 'О', 'о', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'У', 'у', 'Ф', 'ф', 'Х', 'х', 'Ц', 'ц', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ъ', 'ъ', 'Ы', 'ы', 'Ь', 'ь',
//    'Э',
//    'э',
//    'Ю',
//    'ю',
//    'Я',
//    'я'];


//const EnabledInput: React.FC<OneLetterEnabledInputProps> = ({ row, type, language, UpdateField }) => {
//    const [lang, setLanguage] = useState(language);
//    const [value, setValue] = useState("");
//    const [width, setWidth] = useState("");
//    const [rowValue, setRowValue] = useState(row);
//    const [typeX, setType] = useState(type);
//    let textInput = React.createRef();

//    function checkValidity(e: any) {
//        var elem = e.key;
//        var allowedChars = AllowedLetters[lang];
//        if (allowedChars.indexOf(elem) >= 0) {
//            setValue(elem);
//        } else {
//            if (elem == "Delete" || elem == "Backspace") {

//        return true;
//    }

//        return true;
//    }

//    function onChange(e: any) {
//        var length = e.target.value.length;
//        var w = length * 20;
//        setWidth(111);
//    }

//    return <div style={{ width: '100px' }} className={'ddd'}>
//        <input ref={textInput} 
//            onChange={() => UpdateField(rowValue, 0, typeX, textInput.current.value)}
//            onKeyDown={(e) => checkValidity(e)}
//            className="simpleInput"
//            type="text"
//        />
//    </div>
//};

//export default EnabledInput;