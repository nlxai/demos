import React from 'react';

interface TicTacToeStatusProps {
  gameStatus: string;
  winner: string | null;
  lastError: string | null;
}

const TicTacToeStatus: React.FC<TicTacToeStatusProps> = ({
  gameStatus,
  winner,
  lastError
}) => {
  return (
    <div className="text-center space-y-2">
      {gameStatus === 'idle' && (
        <div>
          <p className="text-lg text-gray-700">
            Ready to play? Say <strong>"I want to play tic-tac-toe"</strong> or click Start Game
          </p>
          <p className="text-sm text-gray-500 mt-1">
            You'll play as X, Voice+ will play as O
          </p>
        </div>
      )}

      {gameStatus === 'playing' && (
        <div>
          <p className="text-lg text-blue-600 font-semibold">
            Your turn! (X)
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Say "X in position [1-9]" or "X in [location]"
          </p>
        </div>
      )}

      {gameStatus === 'won' && (
        <div>
          {winner === 'X' ? (
            <p className="text-2xl font-bold text-green-600">
              🎉 You win!
            </p>
          ) : (
            <p className="text-2xl font-bold text-red-600">
              Voice+ wins! Better luck next time.
            </p>
          )}
          <p className="text-sm text-gray-600 mt-2">
            Say "reset game" or click Reset to play again
          </p>
        </div>
      )}

      {gameStatus === 'draw' && (
        <div>
          <p className="text-xl font-bold text-yellow-600">
            It's a draw! Good game!
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Say "reset game" or click Reset to play again
          </p>
        </div>
      )}

      {lastError && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">
            {lastError}
          </p>
        </div>
      )}
    </div>
  );
};

export default TicTacToeStatus;