import  { useState, useCallback } from 'react';
import { Board, Player, WinState } from '../types';

const initialBoard = (): Board => [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

export const useTicTacToe = () => {
  const [board, setBoard] = useState<Board>(initialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winState, setWinState] = useState<WinState>(null);
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const checkWinner = useCallback((board: Board, player: Player): WinState => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
        return [
          { row: i, col: 0 },
          { row: i, col: 1 },
          { row: i, col: 2 }
        ];
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
        return [
          { row: 0, col: i },
          { row: 1, col: i },
          { row: 2, col: i }
        ];
      }
    }

    // Check diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      return [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 }
      ];
    }

    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
      return [
        { row: 0, col: 2 },
        { row: 1, col: 1 },
        { row: 2, col: 0 }
      ];
    }

    return null;
  }, []);

  const checkDraw = useCallback((board: Board): boolean => {
    return board.every(row => row.every(cell => cell !== null));
  }, []);

  const makeMove = useCallback((row: number, col: number) => {
    if (board[row][col] !== null || winner || isDraw) return;

    const newBoard = [...board.map(row => [...row])];
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    const win = checkWinner(newBoard, currentPlayer);
    if (win) {
      setWinState(win);
      setWinner(currentPlayer);
      return;
    }

    if (checkDraw(newBoard)) {
      setIsDraw(true);
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }, [board, currentPlayer, winner, isDraw, checkWinner, checkDraw]);

  const resetGame = useCallback(() => {
    setBoard(initialBoard());
    setCurrentPlayer('X');
    setWinState(null);
    setWinner(null);
    setIsDraw(false);
  }, []);

  return {
    board,
    currentPlayer,
    winState,
    winner,
    isDraw,
    makeMove,
    resetGame
  };
};
 