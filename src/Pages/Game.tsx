import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Game extends Component { 

  render() {
    return (
      <div>
          <h1>Game</h1>
          <Link to="/">Go To Home</Link>
      </div>
    );
  }
}

export default Game;
