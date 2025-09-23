import { useState, useCallback } from 'react';
import { useTouchpointCustomCommand } from '../contexts/TouchpointContext';
import TicTacToeBoard from './TicTacToeBoard';
import TicTacToeStatus from './TicTacToeStatus';

type GameStatus = 'idle' | 'playing' | 'won' | 'draw' | 'error';
type Player = 'X' | 'O' | null;

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

export default function TicTacToeGame() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [winner, setWinner] = useState<Player>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  // Helper functions
  const initializeBoard = () => Array(9).fill('');

  const getAvailablePositions = useCallback(() => {
    return board
      .map((cell, i) => (cell === '' ? i + 1 : null))
      .filter((pos): pos is number => pos !== null);
  }, [board]);

  const isValidMove = (position: number, boardState: string[]): boolean => {
    return position >= 1 && position <= 9 && boardState[position - 1] === '';
  };

  const checkWinner = (boardState: string[]): { winner: string | null; line: number[] | null } => {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return { winner: boardState[a], line };
      }
    }
    return { winner: null, line: null };
  };

  const checkDraw = (boardState: string[]): boolean => {
    return boardState.every(cell => cell !== '') && !checkWinner(boardState).winner;
  };

  // Start game handler
  const handleStartGame = useCallback(() => {
    setBoard(initializeBoard());
    setGameStatus('playing');
    setWinner(null);
    setLastError(null);
    setWinningLine(null);
  }, []);

  // Reset game handler
  const handleResetGame = useCallback(() => {
    setBoard(initializeBoard());
    setGameStatus('idle');
    setWinner(null);
    setLastError(null);
    setWinningLine(null);
  }, []);

  // Make move handler
  const handleMakeMove = useCallback((payload: any) => {
    if (gameStatus !== 'playing') {
      setLastError('Please start a new game first');
      return;
    }
    console.log(payload)

    const newBoard = [...board];
    let newStatus: GameStatus = gameStatus;
    let newWinner: Player = winner;
    let newError: string | null = null;
    let newWinningLine: number[] | null = null;

    // Process user move
    if (payload.userMove?.position) {
      const userPos = payload.userMove.position;

      if (!isValidMove(userPos, newBoard)) {
        setLastError(`Invalid move: Position ${userPos} is not available`);
        setGameStatus('error');
        setTimeout(() => {
          setGameStatus('playing');
          setLastError(null);
        }, 3000);
        return;
      }

      newBoard[userPos - 1] = 'X';

      // Check for user win
      const userResult = checkWinner(newBoard);
      if (userResult.winner) {
        newStatus = 'won';
        newWinner = 'X';
        newWinningLine = userResult.line;
      } else if (checkDraw(newBoard)) {
        newStatus = 'draw';
      }
    }

    // Process computer move if game is still playing
    if (newStatus === 'playing' && payload.computerMove?.position) {
      const compPos = payload.computerMove.position;

      if (!isValidMove(compPos, newBoard)) {
        setLastError(`Voice+ made invalid move: Position ${compPos}`);
        setGameStatus('error');
        setTimeout(() => {
          setGameStatus('playing');
          setLastError(null);
        }, 3000);
        return;
      }

      newBoard[compPos - 1] = 'O';

      // Check for computer win
      const compResult = checkWinner(newBoard);
      if (compResult.winner) {
        newStatus = 'won';
        newWinner = 'O';
        newWinningLine = compResult.line;
      } else if (checkDraw(newBoard)) {
        newStatus = 'draw';
      }
    }

    // Update all state
    setBoard(newBoard);
    setGameStatus(newStatus);
    setWinner(newWinner);
    setLastError(newError);
    setWinningLine(newWinningLine);
  }, [board, gameStatus, winner]);

  // Register voice commands
  useTouchpointCustomCommand({
    action: 'start_tic_tac_toe',
    description: 'Start a new tic-tac-toe game. User plays X and goes first.',
    schema: {
      type: 'object',
      properties: {}
    },
    handler: handleStartGame
  });

  useTouchpointCustomCommand({
    action: 'reset_tic_tac_toe',
    description: 'Reset the tic-tac-toe game to start over',
    schema: {
      type: 'object',
      properties: {}
    },
    handler: handleResetGame
  });

  // Dynamic move command with board state
  const boardDisplay = board.map((cell, i) => cell || `${i + 1}`).join(',');
  const available = getAvailablePositions();
  const availableStr = available.length > 0 ? available.join(',') : 'none';

  const moveCommandDescription = `Make a move in tic-tac-toe game.
    Board positions: 1=top-left, 2=top-middle, 3=top-right,
    4=middle-left, 5=center, 6=middle-right,
    7=bottom-left, 8=bottom-middle, 9=bottom-right.
    Current board state: [${boardDisplay}] where numbers are empty positions, X is user, O is computer.
    Available positions: [${availableStr}].
    User is X (plays first), computer is O.
    Game status: ${gameStatus}.
    ${gameStatus === 'playing' ? 'You must provide both the user\'s move and then your move as the computer opponent. If the user wins, then return 0 as the spot. Choose strategic moves to try to win or block the user from winning.' : 'Game is not in playing state, moves cannot be made.'}`;

  useTouchpointCustomCommand({
    action: 'make_tic_tac_toe_move',
    description: moveCommandDescription,
    schema: {
      type: 'object',
      properties: {
        userMove: {
          type: 'object',
          properties: {
            position: {
              type: 'number',
              minimum: 1,
              maximum: 9,
              description: 'Position for user move (1-9)'
            }
          },
          required: ['position']
        },
        computerMove: {
          type: 'object',
          properties: {
            position: {
              type: 'number',
              minimum: 0,
              maximum: 9,
              description: 'Position for computer move (1-9). 0 if user won the previous move'
            }
          }
        }
      },
      required: ['userMove', 'computerMove']
    },
    handler: handleMakeMove
  });

  // Manual cell click handler (for testing without voice)
  const handleCellClick = (index: number) => {
    if (gameStatus !== 'playing') return;

    // Simulate a move command with just user move
    handleMakeMove({
      userMove: { position: index + 1 }
    });
  };

  return (
    <div className="space-y-6">
      <TicTacToeStatus
        gameStatus={gameStatus}
        winner={winner}
        lastError={lastError}
      />

      <TicTacToeBoard
        board={board}
        winningLine={winningLine}
        onCellClick={handleCellClick}
        gameStatus={gameStatus}
      />

      <div className="flex justify-center gap-4">
        <button
          onClick={handleStartGame}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          disabled={gameStatus === 'playing'}
        >
          Start Game
        </button>
        <button
          onClick={handleResetGame}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}