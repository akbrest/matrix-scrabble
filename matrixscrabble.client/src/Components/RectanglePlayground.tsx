import DictionaryService from "../Services/DictionaryService";
import RussianService from "../Services/RussianService";
// import EnglishService from "../Services/EnglishService";
import React from "react";
import WordFormClass from "../Components/WordFormClass";

type Props = {
    Word: string;
    UpdateField: (x: number, y: number, type: string, value: string) => void;
};

type State = {
    Word: string;
    UpdateField: (x: number, y: number, type: string, value: string) => void;
    FirstLetter: string;
    LastLetter: string;
    MiddleSubwordLength: number;
};

class RectanglePlayground extends React.Component<Props, State> {
    TestEnglish = () => {
        var item = {
            word: "Man",
            length: "Man".length,
            status: "",
        };

        var item2 = {
            word: "Red",
            length: "Red".length,
            status: "",
        };

        var item3 = {
            word: "Onion",
            length: "Onion".length,
            status: "",
        };

        var item4 = {
            word: "asdlsadksad",
            length: "asdlsadksad".length,
            status: "",
        };

        var items = [item, item2, item3, item4];

        this.dictionaryService.CheckWords();
    };

    TestRussian = () => {
        var item = {
            word: "Катастрофа",
            length: "Катастрофа".length,
            status: "",
        };

        var item2 = {
            word: "вывфв",
            length: "вывфв".length,
            status: "",
        };

        const items = [item, item2];

        this.dictionaryService.CheckWords();
    };

    apiService = new RussianService();
    dictionaryService = new DictionaryService(this.apiService);

    render() {
        var word = this.props.Word;

        if (word == null) {
            word = "";
        }

        const letters = word.toUpperCase().split("");
        const reversedLetters = letters.slice().reverse();
        const countDisabledLetters = 2;

        return (
            <div>
                {letters.map((element, index) => {
                    if (index === 0) {
                        return (
                            <WordFormClass
                                key={"WordFormClass" + index}
                                y={0}
                                x={index}
                                FirstLetter={element}
                                LastLetter={reversedLetters[index]}
                                MiddleSubwordLength={word.length - countDisabledLetters}
                                UpdateField={this.props.UpdateField}
                                Word=""
                            />
                        );
                    } else if (index === letters.length - 1) {
                        return (
                            <WordFormClass
                                key={"WordFormClass" + index}
                                y={index}
                                x={index}
                                UpdateField={this.props.UpdateField}
                                FirstLetter={reversedLetters[0]}
                                LastLetter={letters[0]}
                                Word=""
                                MiddleSubwordLength={word.length - countDisabledLetters}
                            />
                        );
                    } else {
                        return (
                            <WordFormClass
                                key={"WordFormClass" + index}
                                Word=""
                                UpdateField={this.props.UpdateField}
                                y={index}
                                x={index}
                                FirstLetter={letters[index]}
                                LastLetter={reversedLetters[index]}
                                MiddleSubwordLength={word.length - countDisabledLetters}
                            />
                        );
                    }
                })}
            </div>
        );
    }
}

export default RectanglePlayground;
