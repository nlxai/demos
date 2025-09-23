import SectionHeader from '../components/SectionHeader';
import TicTacToeGame from '../components/TicTacToeGame';

export default function TicTacToe() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SectionHeader
        title="Voice+ Tic-Tac-Toe"
        subtitle="Play tic-tac-toe against Voice+ using voice commands"
      />

      <TicTacToeGame />

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Voice Commands:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• "I want to play tic-tac-toe" - Begin a new game</li>
          <li>• "Put X in position 5" or "X in center" - Make your move</li>
          <li>• "Reset the game" - Start over</li>
        </ul>
        <div className="mt-3 pt-3 border-t border-blue-200">
          <p className="text-xs text-blue-700">
            <strong>Position Guide:</strong> 1=top-left, 2=top-middle, 3=top-right,
            4=middle-left, 5=center, 6=middle-right, 7=bottom-left, 8=bottom-middle, 9=bottom-right
          </p>
        </div>
      </div>
    </div>
  );
}