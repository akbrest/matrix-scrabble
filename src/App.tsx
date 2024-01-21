import React, { Component, useState, useEffect } from 'react';
import './App.css';
import GameBoard from './Components/GameBoard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Game from './Pages/Game';

export interface Props {
  timeRemainingInSeconds : string
}

class App extends React.Component<any, any>  { //different

   Word;

 constructor(props: Props) {
    super(props);

    this.state = {
      timeRemainingInSeconds: this.Word
    };
  }

  render() {
    return (
      <div>   
          <h1>Welcome to Matrix Scrabble game!</h1>
          <GameBoard startTimeInSeconds = { this.state.startTimeInSeconds } />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="game" element={<Game />} />
            </Routes>
          </BrowserRouter>
     
      </div>
    );
  }
  
}

export default App;
