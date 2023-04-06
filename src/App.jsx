import { useState } from 'react'
import './App.css'

function App() {
    return (
        <div>
            <Game />
        </div>
    )
}
// child component that handles click on square
function Square({ value, onSquareClick }) {
    return <button className="square" onClick={onSquareClick}>{value}</button>
}

function Board({ xIsNext, squares, onPlay }) {
    //click handler
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'x'
        } else {
            nextSquares[i] = 'o'
        }
        onPlay(nextSquares);
    }

    // calculates winner
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    }
    else {
        status = "Next Player: " + (xIsNext ? "x" : "o");
    }

    //displays squares and it's information
    return (
        <>
            <div className="status">{status}</div>
            <div className="board_row">
                <Square value={squares[0]} onSquareClick={() => { handleClick(0) }} />
                <Square value={squares[1]} onSquareClick={() => { handleClick(1) }} />
                <Square value={squares[2]} onSquareClick={() => { handleClick(2) }} />
            </div>
            <div className="board_row">
                <Square value={squares[3]} onSquareClick={() => { handleClick(3) }} />
                <Square value={squares[4]} onSquareClick={() => { handleClick(4) }} />
                <Square value={squares[5]} onSquareClick={() => { handleClick(5) }} />
            </div>
            <div className="board_row">
                <Square value={squares[6]} onSquareClick={() => { handleClick(6) }} />
                <Square value={squares[7]} onSquareClick={() => { handleClick(7) }} />
                <Square value={squares[8]} onSquareClick={() => { handleClick(8) }} />
            </div>
        </>
    )
}

function Game() {
    //for storing play history of moves
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    //code to handle plays
    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    };


    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'go to move' + move;
        } else {
            description = 'Go to game start';
        }
        return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{description}</button>
                </li>
        );
    });
    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>

        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default App
