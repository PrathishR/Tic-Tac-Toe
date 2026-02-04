import  { Player, WinState } from '../types';
import { X, Circle, RefreshCw } from 'lucide-react';

interface GameStatusProps {
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  winState: WinState;
  onReset: () => void;
}

const GameStatus = ({ currentPlayer, winner, isDraw, onReset }: GameStatusProps) => {
  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      {winner ? (
               <div className="flex items-center text-lg md:text-xl font-bold text-gray-800 status-card px-6 py-3"> 
          {winner === 'X' ? (
            <>
              <X className="w-6 h-6 text-x-color mr-2" strokeWidth={3} />
              <span className="text-x-color">Winner!</span>
            </>
          ) : (
            <>
              <Circle className="w-6 h-6 text-o-color mr-2" strokeWidth={3} />
              <span className="text-o-color">Winner!</span>
            </>
          )}
        </div>
      ) : isDraw ? (
        <div className="text-lg md:text-xl font-bold text-gray-800 bg-white bg-opacity-80 px-6 py-3 rounded-full shadow-game">
          It's a draw!
        </div>
      ) : (
               <div className="flex items-center text-lg md:text-xl font-bold text-gray-800 status-card px-6 py-3"> 
          {currentPlayer === 'X' ? (
            <>
              <X className="w-6 h-6 text-x-color mr-2" strokeWidth={3} />
              <span className="text-x-color">Your turn</span>
            </>
          ) : (
            <>
              <Circle className="w-6 h-6 text-o-color mr-2" strokeWidth={3} />
              <span className="text-o-color">Your turn</span>
            </>
          )}
        </div>
      )}

      <button 
               className="px-4 py-2 btn-primary text-white rounded-md flex items-center gap-2" 
        onClick={onReset}
      >
        <RefreshCw className="w-5 h-5" />
        New Game
      </button>
    </div>
  );
};

export default GameStatus;
 