import React, { Component } from 'react';
import RectanglePlayground from './RectanglePlayground';
import FieldGenerator from '../Services/FieldGenerator';

export interface Props {
  startTimeInSeconds : string
}
  
type State = {
  gameWord: string;
}
class GameBoard extends  React.Component<Props, State>{

  Word;

  Field: FieldGenerator = new FieldGenerator();
  constructor(props: Props) {
    super(props);
    this.state = {
      gameWord: props.startTimeInSeconds
    };
    this.Word = "";
  }

  StartGame = (count: number) => {
    var word = this.Field.GetRandomWord(count);
    this.Word = word;
    this.setState({ gameWord: this.Word })
  };
  
  render() {
    
    var word = this.state.gameWord;

    return (
      <div className='game-field'>
          <div>
            <button onClick={(e) => this.StartGame(3)}>3 Letters</button>
            <button onClick={(e) => this.StartGame(4)}>4 Letters</button>
            <button onClick={(e) => this.StartGame(5)}>5 Letters</button>
            <button onClick={(e) => this.StartGame(6)}>6 Letters</button>
            <button onClick={(e) => this.StartGame(7)}>6 Letters</button>
          </div>
          <div>
            <RectanglePlayground GeneratedWord={word} />
          </div>
      </div>
    )
}
};

export default GameBoard;
