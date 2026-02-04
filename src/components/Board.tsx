import  { useEffect } from 'react';
import Cell from './Cell';
import { Board as BoardType, Player, WinState } from '../types';

interface BoardProps {
  board: BoardType;
  currentPlayer: Player;
  winState: WinState;
  onCellClick: (row: number, col: number) => void;
}

const Board = ({ board, currentPlayer, winState, onCellClick }: BoardProps) => {
  useEffect(() => {
    // This is just to handle focus trapping for accessibility
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll<HTMLElement>('.game-cell');
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isWinCell = (row: number, col: number): boolean => {
    if (!winState) return false;
    return winState.some(pos => pos.row === row && pos.col === col);
  };

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-2 md:gap-3 w-full max-w-xs md:max-w-sm shadow-game rounded-lg overflow-hidden">
      {board.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            isWinCell={isWinCell(rowIndex, colIndex)}
            onClick={() => onCellClick(rowIndex, colIndex)}
            currentPlayer={currentPlayer}
          />
        ))
      ))}
    </div>
  );
};

export default Board;
 
