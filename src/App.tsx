import  { Layout, Github } from 'lucide-react';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import { useTicTacToe } from './hooks/useTicTacToe';

function App() {
  const { board, currentPlayer, winState, winner, isDraw, makeMove, resetGame } = useTicTacToe();

  return (
    <div className="min-h-screen flex flex-col">
           <header className="py-4 header-glass text-white"> 
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Layout className="w-6 h-6" />
            <h1 className="text-xl font-bold">Tic-Tac-Toe</h1>
          </div>
          <a 
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="View source on GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center p-4">
               <div className="game-board p-6 max-w-md w-full"> 
          <Board 
            board={board}
            currentPlayer={currentPlayer}
            winState={winState}
            onCellClick={makeMove}
          />
          
          <GameStatus
            currentPlayer={currentPlayer}
            winner={winner}
            isDraw={isDraw}
            winState={winState}
            onReset={resetGame}
          />
        </div>
      </main>

           <footer className="py-3 footer-glass text-center text-gray-700 text-sm"> 
        <p>Created with JDoodle.AI &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
 