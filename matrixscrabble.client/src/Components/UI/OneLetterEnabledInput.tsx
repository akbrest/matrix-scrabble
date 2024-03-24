import React, { useEffect, useState } from "react";

interface OneLetterEnabledInputProps {
  language: string;
  UpdateField: (x: number, y: number, type: string, value: string) => void;
  x: number;
  y: number;
  board: any;
}

const AllowedLetters = 
{
  En: "AaBbCcDdEeFfGgHIihJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",
  Ru: "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя",
};

const OneLetterEnabledInput: React.FC<OneLetterEnabledInputProps> = ({
  x,
  y,
  language,
  UpdateField,
  board,
}) => {
  const [lang] = useState(language);
  const [value, setValue] = useState("");
  useEffect(() => {
    if (board != null) {
      const items = board.center;
      const item = items[x][y];
      setValue(item);
    }
  }, []);

  const textInput = React.createRef();

  function checkValidity(e: any) {
    let elem = e.key;
    const letters = AllowedLetters[lang]
   
    if (letters.indexOf(elem) < 0) {
      if (elem == "Delete" || elem == "Backspace") {
        e.stopPropagation();
        e.preventDefault();

        if (elem == "Backspace") {
          elem = "";
        }
        if (elem == "Delete") {
          elem = "";
        }
      } else {
        return;
      }
    }

    setValue(elem.toUpperCase());
    UpdateField(x, y, "main", elem.toUpperCase());
    return;
  }

  return (
    <div className="one-symbol-enabled-block">
      <input
        ref={textInput}
        onChange={() => {}}
        onKeyDown={(e) => checkValidity(e)}
        maxLength={1}
        className="simpleInput"
        type="text"
        size={1}
        value={value}
      />
    </div>
  );
};
export default OneLetterEnabledInput;
