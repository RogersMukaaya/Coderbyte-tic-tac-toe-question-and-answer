import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'black'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexWrap': 'wrap',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square({ playerMark, squareId, handleSquareClick }) {
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={() => handleSquareClick(squareId)}
    >
      {playerMark}
    </div>
  );
}

function Board({
  board,
  isXnext,
  winner,
  gameOver,
  handleSquareClick,
  handleRest
}) {
  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        <span>
          {!gameOver && !winner ? "Next Player: " + (isXnext ? "X" : "O") : ''}
        </span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        <span>
          {gameOver && !winner ? "Game Over" : winner ? "Winner: " + winner : ''}
        </span>
      </div>
      <button style={buttonStyle} onClick={handleRest}>Reset</button>
      <div style={boardStyle}>
        {board.map((playerMark, idx) => (
          <Square
            key={idx}
            squareId={idx}
            playerMark={playerMark}
            handleSquareClick={handleSquareClick}
          />
        ))}
      </div>
    </div>
  );
}

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function Game() {
  let initialState = {
    board: Array(9).fill(null),
    isXnext: true,
    gameOver: false
  }

  const [board, setBoard] = useState(initialState.board);
  const [isXnext, setIsXnext] = useState(initialState.isXnext);
  const [isGameOver, setIsGameOver] = useState(initialState.isGameOver);

  let winner = false;

  const isWinner = winningCombinations.some((comb) => {
    const [id1, id2, id3] = comb;
    const marks = [board[id1], board[id2], board[id3]];
    const [firstMark] = marks;
    const isWinningCombo = firstMark && marks.every((mark) => mark === firstMark);
    if (isWinningCombo) {
      winner = firstMark;
      return true;
    }
    return null;
  });

  let squareClicked = (i) => {
    const tempBoard =[...board];
    if(winner || tempBoard[i]) return;
    tempBoard[i] = isXnext ? "X" : "O";
    setIsGameOver(isWinner || tempBoard.every((mark) => !!mark));
    setBoard(tempBoard);
    setIsXnext(!isXnext);
  }

  let resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXnext(true);
    setIsGameOver(false);
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board 
          board={board}
          isXnext={isXnext}
          winner={winner}
          gameOver={isGameOver}
          handleSquareClick={squareClicked}
          handleRest={resetGame}
        />
      </div>
    </div>
  );
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);