import React from "react";
import { Link } from "react-router-dom";

const wordList_1 = ["   ", "rai", "   "];
const wordList_2 = ["ton", "   ", "   "];
const wordList_3 = ["   ", " ow", "   "];
const wordList_4 = ["   ", "   ", "utb"];
const wordList_5 = ["lic", "ow ", "kkk"];
const wordList_6 = ["   ", "tor", "utl"];

const generateGameWordField = (wordList: string[]) => {
    const GameWordField: string[][] = [];
    wordList.forEach(k => {
        const val: string[] = [];
        k.toUpperCase().split("").forEach(d => {
            val.push(d);
        });
        GameWordField.push(val);
    });
    return (GameWordField);
}

const Field1 = generateGameWordField(wordList_1);
const Field2 = generateGameWordField(wordList_2);
const Field3 = generateGameWordField(wordList_3);
const Field4 = generateGameWordField(wordList_4);
const Field5 = generateGameWordField(wordList_5);
const Field6 = generateGameWordField(wordList_6);

const word = "STONE";
const Home = () => {
    let index = -1;
    return (
        <div>
            <h1>Game Name!</h1>
            <div>You need to fill in the matrix with valid words.</div>
            <div>Fill each cell in the central matrix and don not use the cells outside the matrix to earn a maximum score!</div>
            <h2>Key rules:</h2>
            <div className="modal-container">
                <div>You must use both initial letters in every line.</div>
                <div className="modal-block" key="111">
                    <div key="help_1">
                        {
                            Object.keys(Field1).map(keyOuter => {
                                index++;
                                return <div className={index === 1 ? "modal-field-line-highlighted-green" : "modal-field-line"}>
                                    <div className="modal-field-left">&nbsp;</div>
                                    <div className="modal-field-left">&nbsp;</div>
                                    <div className="modal-field-first modal-field">{word[index]}</div>
                                    {Object.keys(Field1[keyOuter]).map(keyInner => {
                                        return (
                                            <div className="modal-field" key={`${keyInner}-${keyOuter}`}>{Field1[keyOuter][keyInner]}</div>
                                        );

                                    })}
                                    <div className="modal-field-last modal-field">{word[word.length - 1 - index]}</div>
                                    <div className="modal-field-right"></div>
                                    <div className="modal-field-right">&nbsp;</div>
                                </div>
                            })
                        }
                    </div>
                </div>
                {index = -1}
                <div>You can not use the initial word in any line. </div>
                <div className="modal-block" key="222">
                    <div key="help_2">
                        {
                            Object.keys(Field2).map(keyOuter => {
                                index++;
                                return <div className={index === 0 ? "modal-field-line-highlighted-red" : "modal-field-line"}>
                                    <div className="modal-field-left">&nbsp;</div>
                                    <div className="modal-field-left">&nbsp;</div>
                                    <div className="modal-field-first modal-field">{word[index]}</div>
                                    {Object.keys(Field2[keyOuter]).map(keyInner => {
                                        return (
                                            <div className="modal-field" key={`${keyInner}-${keyOuter}`}>{Field2[keyOuter][keyInner]}</div>
                                        );

                                    })}
                                    <div className="modal-field-last modal-field">{word[word.length - 1 - index]}</div>
                                    <div className="modal-field-right"></div>
                                    <div className="modal-field-right">&nbsp;</div>
                                </div>
                            })

                        }
                    </div>
                </div>
                {index = -1}
                <div>
                    You can skip cells inside the matrix. 
                </div>
                <div className="modal-block" key="333">
                    
                    <div key="help_3">
                        {
                            Object.keys(Field3).map(keyOuter => {
                                index++;
                                return <div className={index === 1 ? "modal-field-line-highlighted-green" : "modal-field-line"}>
                                    <div className="modal-field-left">&nbsp;</div>
                                    <div className="modal-field-left">&nbsp;</div>
                                    <div className="modal-field-first modal-field">{word[index]}</div>
                                    {Object.keys(Field3[keyOuter]).map(keyInner => {
                                        return (
                                            <div className="modal-field" key={`${keyInner}-${keyOuter}`}>{Field3[keyOuter][keyInner]}</div>
                                        );

                                    })}
                                    <div className="modal-field-last modal-field">{word[word.length - 1 - index]}</div>
                                    <div className="modal-field-right">&nbsp;</div>
                                    <div className="modal-field-right">&nbsp;</div>
                                </div>
                            })

                        }
                    </div>
                </div>
                {index = -1}
                <div>
                    You can use cells outside the matrix. 
                </div>
                <div className="modal-block" key="444">
                    <div key="help_4">
                        {
                            Object.keys(Field4).map(keyOuter => {
                                index++;
                                return <div className={index === 2 ? "modal-field-line-highlighted-green" : "modal-field-line"}>
                                    <div className="modal-field-left">&nbsp;</div>
                                    <div className="modal-field-left">&nbsp;</div>
                                    <div className="modal-field-first modal-field">{word[index]}</div>
                                    {Object.keys(Field4[keyOuter]).map(keyInner => {
                                        return (
                                            <div className="modal-field" key={`${keyInner}-${keyOuter}`}>{Field4[keyOuter][keyInner]}</div>
                                        );

                                    })}
                                    <div className="modal-field-last modal-field">{word[word.length - 1 - index]}</div>
                                    <div className="modal-field-right">{index == 2 ? "X" : ""}</div>
                                    <div className="modal-field-right">&nbsp;</div>
                                </div>
                            })

                        }
                    </div>
                </div>
            </div>
        <h2>Scoring System</h2>
            <div className="modal-container">
                {index = -1}
                <div>
                    You earn points only for valid words.
                </div>
                <div>
                    Every filled cell inside the matrix <span className="highlighted-green">brings</span> 1 point.
                </div>
                <div className="modal-block" key="555">
                    
                    <div key="help_5">
                        {
                            Object.keys(Field5).map(keyOuter => {
                                index++;
                                return <div className={(index === 0 || index == 1) ? "modal-field-line-highlighted-green" : (index === 2 ? "modal-field-line-highlighted-red" : "modal-field-line")}>
                                    <div className="modal-field-left">&nbsp;</div>
                                    <div className="modal-field-left">&nbsp;</div>
                                    <div className="modal-field-first modal-field">{word[index]}</div>
                                    {Object.keys(Field5[keyOuter]).map(keyInner => {
                                        return (
                                            <div className="modal-field" key={`${keyInner}-${keyOuter}`}>{Field5[keyOuter][keyInner]}</div>
                                        );

                                    })}
                                    <div className="modal-field-last modal-field">{word[word.length - 1 - index]}</div>
                                    <div className="modal-field-right">&nbsp;</div>
                                    <div className="modal-field-right-point">{index == 0 ? "+5" : ""}{index == 1 ? "+4" : ""}{index == 2 ? "0" : ""}</div>
                                </div>
                            })

                        }
                    </div>
                </div>
                {index = -1}
                <div>
                    Every used cell outside the matrix <span className="highlighted-red">deducts</span> 0.5 point.
                </div>
                <div className="modal-block" key="666">

                    <div key="help_6">
                        {
                            Object.keys(Field6).map(keyOuter => {
                                index++;
                                return <div className={(index === 1 || index === 2) ? "modal-field-line-highlighted-green" : "modal-field-line"}>
                                    <div className="modal-field-left">&nbsp;</div>
                                    <div className="modal-field-left">{index == 1 ? "A" : ""}</div>
                                    <div className="modal-field-first modal-field">{word[index]}</div>
                                    {Object.keys(Field6[keyOuter]).map(keyInner => {
                                        return (
                                            <div className="modal-field" key={`${keyInner}-${keyOuter}`}>{Field6[keyOuter][keyInner]}</div>
                                        );

                                    })}
                                    <div className="modal-field-last modal-field">{word[word.length - 1 - index]}</div>
                                    <div className="modal-field-right">{index == 2 ? "O" : ""}</div>
                                    <div className="modal-field-right">{index == 2 ? "K" : ""}</div>
                                    <div className="modal-field-right">&nbsp;</div>
                                    <div className="modal-field-right-point">{index == 1 ? "+4.5" : ""}{index == 2 ? "+4" : ""}</div>
                                </div>
                            })

                        }
                    </div>
                </div>
                {index = -1}
                <div>
                    Hurry up! Your speed also counts. 
                </div>
            </div>
            <Link to="/games">Try to play!</Link>
        </div>
    );
}


/* your old code
Object.keys(Field4).map(keyOuter => {
                                index++;
                                var b = false
                                if (index == 1) { b = true }
                                return <div className="modal-field-line">

                                    {b ? (<React.Fragment>
                                        <div className="modal-field-empty">&nbsp;</div>
                                        <div className="modal-field-left">&nbsp;</div>
                                    </React.Fragment>

                                    ) : (
                                        <React.Fragment>                                          <div className="modal-field-left">&nbsp;</div>

                                            <div className="modal-field-left">&nbsp;</div>
                                        </React.Fragment>

                                    )}
                                    <div className="modal-field-left">&nbsp;</div>
                                    <div className="modal-field-first modal-field">{word[index]}</div>
                                    {Object.keys(GameWordField[keyOuter]).map(keyInner => {
                                        return (
                                            <div className="modal-field" key={`${keyInner}-${keyOuter}`}>{GameWordField[keyOuter][keyInner]}</div>
                                        );

                                    })}
                                    <div className="modal-field-last modal-field">{word[word.length - 1 - index]}</div>
                                    <div className="modal-field-right">&nbsp;</div>
                                </div>
                            })
*/

export default Home;