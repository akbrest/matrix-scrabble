import React from "react";
import { Link } from "react-router-dom";

var GameWordField: string[][] = [];

var word = "STONE";
word.split("").forEach(() => {
    let val: string[] = [];
    word.substring(0, word.length - 2).split("").forEach(() => {
        val.push("");
    });

    GameWordField.push(val);
});

const Home = () => {
    var index = -1;

    return (
        <div>
            <h1>Welcome to Matrix Scrabble game!</h1>
            <div>Here will be added information how to play ...</div>

            <div className="modal-container">
                <div className="modal-block" key="111">
                    <div>
                        this is Game Field to play
                    </div>
                    <div key="help_1">
                        {
                            Object.keys(GameWordField).map(keyOuter => {
                                index++;
                                return <div className="modal-field-line">
                                    <div className="modal-field-left">&nbsp;</div>
                                    <div className="modal-field-left">&nbsp;</div>
                                    <div className="modal-field-first modal-field">{word[index]}</div>
                                    {Object.keys(GameWordField[keyOuter]).map(keyInner => {
                                        return (
                                            <div className="modal-field" key={`${keyInner}-${keyOuter}`}>{GameWordField[keyOuter][keyInner]}</div>
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
                <div className="modal-block" key="222">
                    <div>
                        this is Game Field to play
                    </div>
                    <div key="help_2">
                        {
                            Object.keys(GameWordField).map(keyOuter => {
                                index++;
                                return <div className="modal-field-line">
                                    <div className="modal-field-left">&nbsp;</div>
                                    <div className="modal-field-left">&nbsp;</div>
                                    <div className="modal-field-first modal-field">{word[index]}</div>
                                    {Object.keys(GameWordField[keyOuter]).map(keyInner => {
                                        return (
                                            <div className="modal-field" key={`${keyInner}-${keyOuter}`}>{GameWordField[keyOuter][keyInner]}</div>
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
                <div className="modal-block" key="222">
                    <div>
                        this is Game Field to play
                    </div>
                    <div key="help_3">
                        {
                            Object.keys(GameWordField).map(keyOuter => {
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

                        }
                    </div>
                </div>
                {index = -1}
                <div className="modal-block" key="222">
                    <div>
                        this is Game Field to play
                    </div>
                    <div key="help_3">
                        <div className="modal-field-line">
                            <div className="modal-field-empty">&nbsp;</div>
                            <div className="modal-field-left">&nbsp;</div>
                            <div className="modal-field-left">&nbsp;</div>
                            <div className="modal-field-first modal-field">F</div>
                            <div className="modal-field">d</div>
                            <div className="modal-field">d</div>
                            <div className="modal-field">d</div>
                            <div className="modal-field-last modal-field">D</div>
                            <div className="modal-field-right">&nbsp;</div>
                        </div>
                        <div className="modal-field-line">

                            <div className="modal-field-empty">&nbsp;</div>
                            <div className="modal-field-left">&nbsp;</div>
                            <div className="modal-field-left">&nbsp;</div>

                            <div className="modal-field-first modal-field">F</div>
                            <div className="modal-field">d</div>
                            <div className="modal-field">d</div>
                            <div className="modal-field">d</div>
                            <div className="modal-field-last modal-field">D</div>
                            <div className="modal-field-right">&nbsp;</div>
                        </div>
                        <div className="modal-field-line">

                            <div className="modal-field-empty">&nbsp;</div>
                            <div className="modal-field-left">&nbsp;</div>
                            <div className="modal-field-left">&nbsp;</div>

                            <div className="modal-field-first modal-field">F</div>
                            <div className="modal-field">d</div>
                            <div className="modal-field">d</div>
                            <div className="modal-field">d</div>
                            <div className="modal-field-last modal-field">D</div>
                            <div className="modal-field-right">&nbsp;</div>
                        </div>
                        <div className="modal-field-line">
                            <div className="modal-field-empty">&nbsp;</div>
                            <div className="modal-field-left">&nbsp;</div>
                            <div className="modal-field-left">&nbsp;</div>
                            <div className="modal-field-first modal-field">F</div>
                            <div className="modal-field">d</div>
                            <div className="modal-field">d</div>
                            <div className="modal-field">d</div>
                            <div className="modal-field-last modal-field">D</div>
                            <div className="modal-field-right">&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/games">Try to play!</Link>
        </div>
    );
}

export default Home;