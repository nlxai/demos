import { useCallback, useMemo, useState } from 'react';
import { useTouchpointCustomCommand } from '../contexts/TouchpointContext';
import { useTemporaryMessage } from '../hooks/useTemporaryMessage';
import {
  COMPONENT_CONTAINER,
  BUTTON_SUCCESS,
  BUTTON_PRIMARY,
  BUTTON_DANGER,
  GRID_COLS_3,
  ALERT_INFO,
  HEADING_COMPONENT,
  TEXT_DESCRIPTION,
  TEXT_VOICE_COMMANDS,
  COUNTER_DISPLAY,
  COUNTER_LABEL
} from '../styles/componentStyles';

// Actions
const ROLL_ONE_ACTION = 'rollDice';
const ROLL_BOTH_ACTION = 'rollBothDice';
const CLEAR_HISTORY_ACTION = 'clearHistory';

// Dice constants
const D20_MIN = 1;
const D20_MAX = 20;
const HISTORY_SIZE = 7;

// UI text constants
const TITLE = 'D20 Dice Roller';
const EXPECTED_BEHAVIOR_TEXT = 'Use voice or buttons to roll a D20 (or two) and view recent history.';
const DICE_EMOJI = '🎲';
const NO_ROLL_PLACEHOLDER = '—';

// Success messages
const MESSAGE_ROLL_ONE_PREFIX = 'Rolled d20:';
const MESSAGE_ROLL_BOTH_PREFIX = 'Rolled 2d20:';
const MESSAGE_CLEAR_HISTORY = 'History cleared';

// Voice command reference text
const VOICE_CMDS_ROLL_ONE = '"roll dice", "roll die", "roll"';
const VOICE_CMDS_ROLL_BOTH = '"roll both dice", "roll two dice"';
const VOICE_CMDS_CLEAR = '"clear history", "reset rolls"';

// Schemas (no parameters)
const EMPTY_SCHEMA = {
  type: 'object',
  properties: {},
  additionalProperties: false
} as const;

type DiceRoll = {
  die1: number;
  die2?: number;
  total?: number;
};

const generateRandomIntInclusive = (min: number, max: number): number => {
  const safeMin = Math.ceil(min);
  const safeMax = Math.floor(max);
  const random = Math.random();
  const range = safeMax - safeMin + 1;
  const scaled = Math.floor(random * range);
  const result = safeMin + scaled;
  return result;
};

export default function DiceRollerTest() {
  const [currentDie1, setCurrentDie1] = useState<number | null>(null);
  const [currentDie2, setCurrentDie2] = useState<number | null>(null);
  const [history, setHistory] = useState<DiceRoll[]>([]);
  const { message, showMessage } = useTemporaryMessage();

  const handleRollOne = useCallback(() => {
    const rollValue = generateRandomIntInclusive(D20_MIN, D20_MAX);
    const nextRoll: DiceRoll = { die1: rollValue };
    const nextHistory = [nextRoll, ...history].slice(0, HISTORY_SIZE);
    const messageText = `${MESSAGE_ROLL_ONE_PREFIX} ${rollValue}`;

    setCurrentDie1(rollValue);
    setCurrentDie2(null);
    setHistory(nextHistory);
    showMessage(messageText);
  }, [history, showMessage]);

  const handleRollBoth = useCallback(() => {
    const first = generateRandomIntInclusive(D20_MIN, D20_MAX);
    const second = generateRandomIntInclusive(D20_MIN, D20_MAX);
    const total = first + second;

    const nextRoll: DiceRoll = { die1: first, die2: second, total };
    const nextHistory = [nextRoll, ...history].slice(0, HISTORY_SIZE);
    const messageText = `${MESSAGE_ROLL_BOTH_PREFIX} ${first} + ${second} = ${total}`;

    setCurrentDie1(first);
    setCurrentDie2(second);
    setHistory(nextHistory);
    showMessage(messageText);
  }, [history, showMessage]);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    const messageText = MESSAGE_CLEAR_HISTORY;
    showMessage(messageText);
  }, [showMessage]);

  // Voice commands registration
  useTouchpointCustomCommand({
    action: ROLL_ONE_ACTION,
    description: 'Roll a single d20 die',
    schema: EMPTY_SCHEMA,
    handler: handleRollOne
  });

  useTouchpointCustomCommand({
    action: ROLL_BOTH_ACTION,
    description: 'Roll two d20 dice and provide the total',
    schema: EMPTY_SCHEMA,
    handler: handleRollBoth
  });

  useTouchpointCustomCommand({
    action: CLEAR_HISTORY_ACTION,
    description: 'Clear the dice roll history',
    schema: EMPTY_SCHEMA,
    handler: handleClearHistory
  });

  const currentTotal = useMemo(() => {
    const hasBoth = currentDie1 != null && currentDie2 != null;
    if (!hasBoth) return null;
    const totalValue = (currentDie1 as number) + (currentDie2 as number);
    return totalValue;
  }, [currentDie1, currentDie2]);

  return (
    <div className={COMPONENT_CONTAINER}>
      <h3 className={HEADING_COMPONENT}>
        {TITLE}
      </h3>
      <p className={TEXT_DESCRIPTION}>
        <em>Expected behavior:</em> {EXPECTED_BEHAVIOR_TEXT}
      </p>

      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-10">
          <div>
            <div className="text-4xl mb-1">{DICE_EMOJI}</div>
            <div className={COUNTER_DISPLAY}>{currentDie1 ?? NO_ROLL_PLACEHOLDER}</div>
            <div className={COUNTER_LABEL}>Die 1</div>
          </div>
          <div>
            <div className="text-4xl mb-1">{DICE_EMOJI}</div>
            <div className={COUNTER_DISPLAY}>{currentDie2 ?? NO_ROLL_PLACEHOLDER}</div>
            <div className={COUNTER_LABEL}>Die 2</div>
          </div>
        </div>

        {currentTotal != null && (
          <div className="mt-4">
            <div className="text-gray-600">Total</div>
            <div className="text-2xl font-semibold text-blue-700">{currentTotal}</div>
          </div>
        )}
      </div>

      <div className={`${GRID_COLS_3} mb-4`}>
        <button onClick={handleRollOne} className={BUTTON_SUCCESS}>
          Roll 1 d20
        </button>
        <button onClick={handleRollBoth} className={BUTTON_PRIMARY}>
          Roll 2 d20s
        </button>
        <button onClick={handleClearHistory} className={BUTTON_DANGER}>
          Clear history
        </button>
      </div>

      {message && (
        <div className={`${ALERT_INFO} mb-4`}>
          {message}
        </div>
      )}

      <div className="mt-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Recent Rolls</div>
        {history.length === 0 ? (
          <div className="text-sm text-gray-500">No rolls yet</div>
        ) : (
          <ul className="text-sm text-gray-700 space-y-1">
            {history.map((r, idx) => {
              const hasTwo = r.die2 != null;
              const entryText = hasTwo
                ? `Die 1: ${r.die1}, Die 2: ${r.die2}  Total: ${r.total}`
                : `Die 1: ${r.die1}`;
              return (
                <li key={`roll-${idx}`} className="flex items-center justify-between">
                  <span>{entryText}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className={`mt-4 ${TEXT_VOICE_COMMANDS}`}>
        <strong>Voice Commands:</strong> {VOICE_CMDS_ROLL_ONE}; {VOICE_CMDS_ROLL_BOTH}; {VOICE_CMDS_CLEAR}
      </div>
    </div>
  );
}


