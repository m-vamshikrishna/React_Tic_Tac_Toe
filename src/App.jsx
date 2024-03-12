import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning_combinitions"
import GameOver from "./components/GameOver"
const PLAYERS = {
  O:'Player 1',
  X:'Player 2'
};
const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]
function deriveActivePlayer(prevTurns)
{
    let currentPlayer = 'O';
    if(prevTurns.length > 0 && prevTurns[0].player === 'O')
    {
      currentPlayer = 'X';
    }
    return currentPlayer;
}
function deriveGameBoard(gameTurns)
{
  let  gameBoard=[...INITIAL_GAME_BOARD.map(array=>[...array])];
  for(const turn of gameTurns)
  {
        const {square,player} = turn;
        const {row,col}= square;
        gameBoard[row][col]= player;
  }
  return gameBoard;
}
function deriveWinner(gameBoard,players)
{
  let winner = null;
  for(const combinition of WINNING_COMBINATIONS)
  {
    const firstSquareSymbol = gameBoard[combinition[0].row][combinition[0].col];
    const secondSquareSymbol = gameBoard[combinition[1].row][combinition[1].col];
    const thirdSquareSymbol = gameBoard[combinition[2].row][combinition[2].col];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol)
    {
      winner = players[firstSquareSymbol];
    }
  }
  return  winner;
}

function App() {
  const [players,setPlayers] = useState(PLAYERS);
  const [gameTurns,setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = deriveGameBoard(gameTurns);
  let winner = deriveWinner(gameBoard,players);
  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex,colIndex)
  {
    setGameTurns((prevTurns)=>{
    var found = false;
    for(const turn of gameTurns)
    {
        const {square,player} = turn;
        const {row,col}= square;
        if(row===rowIndex && col===colIndex)
        found = true;
    }
    const updatedTurns = [
      {square:{row:rowIndex,col:colIndex},player:activePlayer} ,
      ...prevTurns
    ]
    return  updatedTurns;
    });
    
  }
  function handleRestart()
  {
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol,newName)
  {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
    console.log(players);
  }
  return (
    <main>
      <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player name={players.O} symbol="O" isActive={activePlayer==="O"} onChangeName={handlePlayerNameChange}/>
        <Player name={players.X} symbol="X" isActive={activePlayer==="X"} onChangeName={handlePlayerNameChange}/>
      </ol>
      {(winner || hasDraw) && <GameOver winner= {winner} restart={handleRestart}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
     
      </div>
      <Log turns={gameTurns} players={players}/>
    </main>
  )
}

export default App
