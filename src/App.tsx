import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import OX,{State as OXState} from './board/OX';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Board from './board';
import { evaluateWinner, GameState, nextMove, nextPlayer } from './board/service';
// import { nextMove } from './board/service';

function App() {
  const [player,setPlayer] = useState(OXState.O);
  const [gameStatus,setGameStatus] = useState(GameState.NOT_END);
 
  const blankBoard = new Array(3).fill([]).map( e => new Array(3).fill(OXState.Blank));;
  const [board,setBoard] = useState(blankBoard);

  const handleClick = ( x:number ,y:number ) => {
    if(gameStatus !== GameState.NOT_END
        || board[x][y] !== OXState.Blank){
      return;
    }

    const newBoard = nextMove(board)(player)(x,y);
    const status = evaluateWinner(newBoard);
 
    setGameStatus(status);
    setBoard(newBoard);
    setPlayer( nextPlayer(player) );

  }

  return (
    
    <div className="App">
      {
        <Board
          onClick={handleClick}
          board={board}
        />
      }
      {
        (gameStatus === GameState.X_WIN)
        && "X Win"
      }
      {
        (gameStatus === GameState.O_WIN)
        && "O Win"
      }
      {
        (gameStatus === GameState.DRAW)
        && "Draw"
      }
    </div>
  );
}

export default App;
