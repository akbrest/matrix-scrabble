import React, { useEffect, useState } from "react";
import { GameBoardModel } from "../../redux/models/GameBoardModel";

interface OneLetterEnabledInputProps {
  language: string;
  UpdateField: (x: number, y: number, type: string, value: string) => void;
  row: number;
    type: string;
    board: any
}

const AllowedLetters =
{
    En: "AaBbCcDdEeFfGgHIihJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",
    Ru: "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя"
};


const AllowedKeys = ["Delete", "Tab", "Backspace"];

const EnabledInput: React.FC<OneLetterEnabledInputProps> = ({
  row,
  type,
  language,
  UpdateField,
  board,
}) => {
  const [lang] = useState(language);
  const [rowValue] = useState(row);
  const [typeX] = useState(type);
  const [value, setValue] = useState("");
  const textInput = React.createRef();

  useEffect(() => {
  
    if (type == "left" && board != null) {
      const item = board.left[row];
      setValue(item);
    } else if (type == "right" && board != null) {
      const items = board.right;
      let item = items[row];
      setValue(item);
    }
  }, []); // empty array means only once

  function Update(): void {
    UpdateField(rowValue, 0, typeX, textInput.current.value.toUpperCase());
    setValue(textInput.current.value.toUpperCase());
    return;
  }

  function CheckValidity(e: any): void {
    const elem = e.key;

     let letters = AllowedLetters[lang];

    if (letters.indexOf(elem) < 0) {
      if(AllowedKeys.includes(elem)){
        console.log(elem + 'pressed')
      } else {
        e.preventDefault();
      }
    }

    return;
  }

  return (
    <div className="symbols-enabled-block">
      <input
        ref={textInput}
        maxLength={4}
        onChange={() => Update()}
        onKeyDown={(e) => CheckValidity(e)}
        className="simpleInput-side"
        type="text"
        value={value}
      />
    </div>
  );
};

export default EnabledInput;
