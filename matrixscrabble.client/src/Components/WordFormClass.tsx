import EnabledInput from "./UI/EnabledInput";
import OneLetterDisabledInput from "./UI/OneLetterDisabledInput";
import OneLetterEnabledInput from "./UI/OneLetterEnabledInput";
import React from "react";

type Props = {
    Word: string;
    UpdateField: (x: number, y: number, type: string, value: string) => any;
    FirstLetter: string;
    LastLetter: string;
    MiddleSubwordLength: number;
    x: number;
    y: number;
    Language: string;

};

type State = {
    UpdateField: (x: number, y: number, type: string, value: string) => any;
    FirstLetter: string;
    LastLetter: string;
    MiddleSubwordLength: number;
    Language: string;
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
        var language = this.props.Language;

        
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
            <div>
                <div className="game-field-line">
                    <div className="game-field-line-left">
                        <EnabledInput
                            key={"FooClass_"}
                            UpdateField={updateField}
                            Language={language}
                            type={'left'}
                            row={this.props.x}
                        />
                    </div>
                    <OneLetterDisabledInput letter={firstLetter} />
                    {items.map(({ }, index) => {
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
                    <div className="game-field-line">
                        <EnabledInput
                            key={"FooClass_"}
                            UpdateField={updateField}
                            Language={language }
                            type={'right'}
                            row={this.props.x}
                        />
                        <div>
                            <button type="submit" className="ml-20">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default WordFormClass;
