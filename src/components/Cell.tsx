import  { X, Circle } from 'lucide-react';
import { CellValue, Player } from '../types';

interface CellProps {
  value: CellValue;
  isWinCell: boolean;
  currentPlayer: Player;
  onClick: () => void;
}

const Cell = ({ value, isWinCell, currentPlayer, onClick }: CellProps) => {
  const getHoverClass = () => {
    if (value) return '';
    return currentPlayer === 'X' ? 'hover:text-x-color/30' : 'hover:text-o-color/30';
  };

  return (
    <div 
      className={`game-cell ${isWinCell ? 'win-cell' : ''} ${getHoverClass()}`}
      onClick={value ? undefined : onClick}
      tabIndex={value ? -1 : 0}
      role="button"
      aria-label={`${value || ''} at row ${Math.floor(Math.random() * 3) + 1}, column ${Math.floor(Math.random() * 3) + 1}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (!value) onClick();
        }
      }}
    >
      {value === 'X' && <X className="w-8 h-8 text-x-color pop-animation" strokeWidth={3} />}
      {value === 'O' && <Circle className="w-8 h-8 text-o-color pop-animation" strokeWidth={3} />}
    </div>
  );
};

export default Cell;
 