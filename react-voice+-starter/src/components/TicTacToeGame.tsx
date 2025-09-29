import React, { useState, useCallback } from 'react';
import { useTouchpointCustomCommand } from '../contexts/TouchpointContext';
import TicTacToeBoard from './TicTacToeBoard';
import TicTacToeStatus from './TicTacToeStatus';

type GameStatus = 'idle' | 'playing' | 'won' | 'draw' | 'error';
type Player = 'X' | 'O' | null;

interface VoicePlusMovePayload {
  userMove?: { position: number };     // User's spoken move (1-9)
  computerMove?: { position: number };  // Voice+ AI's calculated response (0-9, 0 if game ended)
}

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

interface GameEvaluation {
  status: GameStatus;
  winner: Player;
  line: number[] | null;
}

interface MoveResult {
  board: string[];
  status: GameStatus;
  winner: Player;
  line: number[] | null;
  error?: string;
}

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

  const validateMove = (position: number, boardState: string[]): { valid: boolean; error?: string } => {
    if (position < 1 || position > 9) {
      return { valid: false, error: `Invalid position ${position}: must be 1-9` };
    }
    if (boardState[position - 1] !== '') {
      return { valid: false, error: `Position ${position} is already occupied` };
    }
    return { valid: true };
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

  const applyMove = (boardState: string[], position: number, player: 'X' | 'O'): string[] => {
    const newBoard = [...boardState];
    newBoard[position - 1] = player;
    return newBoard;
  };

  const evaluateGameState = (boardState: string[]): GameEvaluation => {
    const winResult = checkWinner(boardState);
    if (winResult.winner) {
      return {
        status: 'won',
        winner: winResult.winner as Player,
        line: winResult.line
      };
    }
    if (checkDraw(boardState)) {
      return {
        status: 'draw',
        winner: null,
        line: null
      };
    }
    return {
      status: 'playing',
      winner: null,
      line: null
    };
  };

  const processMove = (boardState: string[], position: number, player: 'X' | 'O'): MoveResult => {
    const validation = validateMove(position, boardState);

    if (!validation.valid) {
      return {
        board: boardState,
        status: 'playing',
        winner: null,
        line: null,
        error: validation.error
      };
    }

    const newBoard = applyMove(boardState, position, player);
    const evaluation = evaluateGameState(newBoard);

    return {
      board: newBoard,
      ...evaluation
    };
  };

  // Start game handler
  const handleStartGame = useCallback(() => {
    console.log('=== NEW GAME STARTED ===');
    console.log('Voice+ Tic-Tac-Toe: User (X) vs Voice+ AI (O)');
    console.log('Game context will be sent to Voice+ with each command');
    setBoard(initializeBoard());
    setGameStatus('playing');
    setWinner(null);
    setLastError(null);
    setWinningLine(null);
  }, []);

  // Reset game handler
  const handleResetGame = useCallback(() => {
    console.log('Game reset - returning to idle state');
    setBoard(initializeBoard());
    setGameStatus('idle');
    setWinner(null);
    setLastError(null);
    setWinningLine(null);
  }, []);

  const handleMakeMove = useCallback((payload: VoicePlusMovePayload) => {
    // 1. Validate game state
    if (gameStatus !== 'playing') {
      setLastError('Please start a new game first');
      return;
    }

    console.log('\n=== VOICE+ PAYLOAD RECEIVED ===');
    console.log('Board state BEFORE moves:', board.map((c, i) => c || (i + 1)).join(','));
    console.log('Voice+ understood:', {
      userCommand: payload.userMove ? `Place X at position ${payload.userMove.position}` : 'No user move',
      aiDecision: payload.computerMove ? `Place O at position ${payload.computerMove.position}` : 'No AI move'
    });

    let currentBoard = board;
    let gameResult: MoveResult = {
      board: currentBoard,
      status: 'playing',
      winner: null,
      line: null
    };

    // 2. Process user move from Voice+
    if (payload.userMove?.position) {
      console.log(`\nProcessing user move: X -> position ${payload.userMove.position}`);
      gameResult = processMove(currentBoard, payload.userMove.position, 'X');

      if (gameResult.error) {
        console.log(`[ERROR] Move validation failed: ${gameResult.error}`);
        setLastError(gameResult.error);
        setGameStatus('error');
        setTimeout(() => {
          setGameStatus('playing');
          setLastError(null);
        }, 3000);
        return;
      }

      currentBoard = gameResult.board;
      console.log('User move applied successfully');

      if (gameResult.status === 'won') {
        console.log('[GAME OVER] USER WINS!');
      } else if (gameResult.status === 'draw') {
        console.log('[GAME OVER] It\'s a DRAW!');
      }
    }

    // 3. Process Voice+ AI move if game still playing
    if (gameResult.status === 'playing' && payload.computerMove?.position) {
      const compPos = payload.computerMove.position;

      // Voice+ sends 0 if user already won
      if (compPos > 0) {
        console.log(`\nProcessing Voice+ AI move: O -> position ${compPos}`);
        const computerResult = processMove(currentBoard, compPos, 'O');

        if (computerResult.error) {
          console.log(`[ERROR] AI move validation failed: ${computerResult.error}`);
          setLastError(`Voice+ error: ${computerResult.error}`);
          setGameStatus('error');
          setTimeout(() => {
            setGameStatus('playing');
            setLastError(null);
          }, 3000);
          return;
        }

        gameResult = computerResult;
        console.log('Voice+ AI move applied successfully');

        if (gameResult.status === 'won') {
          console.log('[GAME OVER] VOICE+ WINS! Better luck next time.');
        } else if (gameResult.status === 'draw') {
          console.log('[GAME OVER] It\'s a DRAW! Well played.');
        }
      } else {
        console.log('Voice+ recognized game already ended - no counter move needed');
      }
    }

    // 4. Update all state atomically
    if (gameResult.status !== gameStatus) {
      console.log(`\nGame state transition: ${gameStatus} -> ${gameResult.status}`);
    }

    console.log('Board state AFTER moves:', gameResult.board.map((c, i) => c || (i + 1)).join(','));
    const remainingMoves = gameResult.board.filter(cell => cell === '').length;
    if (gameResult.status === 'playing') {
      console.log(`${remainingMoves} positions remaining`);
    }
    console.log('=================================\n');

    setBoard(gameResult.board);
    setGameStatus(gameResult.status);
    setWinner(gameResult.winner);
    setLastError(null);
    setWinningLine(gameResult.line);
  }, [board, gameStatus]);

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

  // Context sent to Voice+ NLU on every render
  const boardDisplay = board.map((cell, i) => cell || `${i + 1}`).join(',');
  const available = getAvailablePositions();
  const availableStr = available.length > 0 ? available.join(',') : 'none';

  // Log context updates when game is active
  React.useEffect(() => {
    if (gameStatus === 'playing' && available.length > 0) {
      console.log('[CONTEXT] Ready for Voice+ NLU:');
      console.log(`   Board: [${boardDisplay}]`);
      console.log(`   Available: [${availableStr}]`);
      console.log(`   Status: ${gameStatus}`);
      console.log('   Waiting for voice command...\n');
    }
  }, [board, gameStatus, boardDisplay, availableStr, available.length]);

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

  // Manual click handler - useful for testing Voice+ integration
  const handleCellClick = (index: number) => {
    if (gameStatus !== 'playing') return;

    handleMakeMove({
      userMove: { position: index + 1 },
      // In real Voice+ flow, computerMove would be provided
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