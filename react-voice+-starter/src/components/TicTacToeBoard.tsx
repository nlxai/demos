import React from 'react';

interface TicTacToeBoardProps {
  board: string[];
  winningLine: number[] | null;
  onCellClick?: (index: number) => void;
  gameStatus: string;
}

const TicTacToeBoard: React.FC<TicTacToeBoardProps> = ({
  board,
  winningLine,
  onCellClick,
  gameStatus
}) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => {
          const isWinningCell = winningLine?.includes(index);
          const isEmpty = cell === '';
          const isClickable = gameStatus === 'playing' && isEmpty;

          return (
            <button
              key={index}
              onClick={() => onCellClick?.(index)}
              className={`
                h-24 w-24 border-2 rounded-lg
                text-4xl font-bold
                transition-all duration-200
                ${isWinningCell
                  ? 'bg-green-100 border-green-500'
                  : 'bg-white border-gray-300'
                }
                ${cell === 'X' ? 'text-blue-600' : ''}
                ${cell === 'O' ? 'text-red-600' : ''}
                ${isClickable
                  ? 'hover:bg-gray-50 hover:border-gray-400 cursor-pointer'
                  : 'cursor-default'
                }
                ${isEmpty ? 'text-gray-300' : ''}
              `}
              disabled={!isClickable}
              aria-label={`Position ${index + 1}: ${cell || 'empty'}`}
            >
              {cell || (
                <span className="text-sm text-gray-400">
                  {index + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TicTacToeBoard;