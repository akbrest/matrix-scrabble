import OneLetterDisabledInput from "./UI/OneLetterDisabledInput";
import OneLetterEnabledInput from "./UI/OneLetterEnabledInput";
import React from "react";

type Props = {
  Word: string;
  UpdateField: (x: number, y: number, value: string) => any;
  FirstLetter: string;
  LastLetter: string;
  MiddleSubwordLength: number;
  x: number;
  y: number;
};

type State = {
  UpdateField: (x: number, y: number, value: string) => any;
  FirstLetter: string;
  LastLetter: string;
  MiddleSubwordLength: number;
  x: number;
  y: number;
};

class WordFormClass extends React.Component<Props, State> {
  render() {
    var word = this.props.Word;
    var middleSubwordLength = this.props.MiddleSubwordLength;
    var firstLetter = this.props.FirstLetter;
    var lastLetter = this.props.LastLetter;
    var updateField = this.props.UpdateField;

    if (word == null) {
      word = "";
    }

    const items = [""];

    var condition = 0;
    while (condition < middleSubwordLength - 1) {
      items.push("");
      condition++;
    }

    return (
      <div className="game-field-line">
        <OneLetterDisabledInput letter={firstLetter} />
        {items.map((element, index) => {
          return (
            <OneLetterEnabledInput
              key={"FooClass" + index}
              UpdateField={updateField}
              Language="en"
              x={this.props.x}
              y={index}
            />
          );
        })}
        <OneLetterDisabledInput letter={lastLetter} />

        <div>
          <button type="submit" className="ml-20">
            Confirm
          </button>
        </div>
      </div>
    );
  }
}

export default WordFormClass;
