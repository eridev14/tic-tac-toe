import { useState } from 'react';
import { Square } from './Square';
import confetti from 'canvas-confetti';
import './app.scss';

const TURNS = {
    x: "❌",
    o: "⚪"
}

const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function App() {

    const [board, setBoard] = useState(() => {
        const boardFromLocalStorage = window.localStorage.getItem("board");
        return boardFromLocalStorage
            ? JSON.parse(boardFromLocalStorage)
            : Array(9).fill(null)
    });
    const [turn, setTurn] = useState(() => {
        const turnFromLocalStorage = window.localStorage.getItem("turn");
        return turnFromLocalStorage ?? TURNS.x
    });
    const [winner, setWinner] = useState(null);

    const chekEndGame = (newBord) => {
        return newBord.every(square => square !== null);
    }

    const updateBoard = (i) => {
        if (board[i] || winner) return
        const newBord = [...board];
        newBord[i] = turn;
        setBoard(newBord);
        const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
        setTurn(newTurn);
        //guardar partida
        window.localStorage.setItem("board", JSON.stringify(newBord));
        window.localStorage.setItem("turn", newTurn);
        const newWinner = checkWinner(newBord)

        if (newWinner) {
            window.localStorage.removeItem("board")
            window.localStorage.removeItem("turn")
            confetti({
                particleCount: 300
            });
            setWinner(newWinner);
        } else if (chekEndGame(newBord)) {
            setWinner(false);
        }
    }

    const checkWinner = (boardToCheck) => {
        for (const combo of WINNER_COMBOS) {
            const [a, b, c] = combo;
            if (boardToCheck[a] &&
                boardToCheck[a] === boardToCheck[b] &&
                boardToCheck[a] === boardToCheck[c]
            ) {
                return boardToCheck[a];
            }
        }
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.x);
        setWinner(null);
        window.localStorage.removeItem("board")
        window.localStorage.removeItem("turn")
    }

    return (
        <main className='board'>
            <h1>Tic Tae Toe</h1>
            <button onClick={resetGame}>Empezar de nuevo</button>
            <section className='game'>
                {board.map((bord, i) => {
                    return (
                        <Square
                            key={i}
                            index={i}
                            updateBoard={updateBoard}
                        >
                            {bord}
                        </Square>
                    )
                })}
            </section>


            <section className='turn'>
                <Square isSelected={turn === TURNS.x}>
                    {TURNS.x}
                </Square>
                <Square isSelected={turn === TURNS.o}>
                    {TURNS.o}
                </Square>
            </section>

            {
                winner !== null && (
                    <section className='winner'>
                        <div className='text'>
                            <h2>
                                {
                                    winner === false
                                        ? 'Empate'
                                        : 'Ganador'
                                }
                            </h2>
                            <header className="win">
                                {winner && <Square>{winner}</Square>}
                            </header>

                            <footer>
                                <button onClick={resetGame}>Empezar de nuevo</button>
                            </footer>
                        </div>
                    </section>
                )
            }

        </main>
    )
}

export default App
