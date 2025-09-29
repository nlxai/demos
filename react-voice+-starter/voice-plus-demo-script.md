# Voice+ Tic-Tac-Toe Demo Script

## Introduction (0:00-0:15)

"This demonstration shows how Voice+ maintains dynamic context through NLX's Natural Language Understanding. The tic-tac-toe game showcases how complete application state is sent with every voice command, enabling intelligent AI responses."

## Starting the Demo (0:15-0:30)

### Action: Open browser console
"Let's start by opening the browser console to see the Voice+ integration in action."

### Action: Say "I want to play tic-tac-toe"
"When I say 'I want to play tic-tac-toe', watch the console."

**Console shows:**
```
=== NEW GAME STARTED ===
Voice+ Tic-Tac-Toe: User (X) vs Voice+ AI (O)
Game context will be sent to Voice+ with each command
```

## Context Transmission (0:30-1:00)

"Notice the context that's now ready for Voice+:"

**Console shows:**
```
[CONTEXT] Ready for Voice+ NLU:
   Board: [1,2,3,4,5,6,7,8,9]
   Available: [1,2,3,4,5,6,7,8,9]
   Status: playing
   Waiting for voice command...
```

"This complete context is sent to the NLU with every command. Voice+ doesn't maintain session state - it receives fresh context each time."

## First Move (1:00-1:30)

### Action: Say "X in position 5"
"Now I'll make my first move: X in position 5."

**Console shows:**
```
=== VOICE+ PAYLOAD RECEIVED ===
Board state BEFORE moves: 1,2,3,4,5,6,7,8,9
Voice+ understood:
   userCommand: Place X at position 5
   aiDecision: Place O at position 1
```

"Voice+ processes my move AND calculates its counter-move in a single response. Watch the processing:"

**Console shows:**
```
Processing user move: X -> position 5
User move applied successfully

Processing Voice+ AI move: O -> position 1
Voice+ AI move applied successfully

Board state AFTER moves: O,2,3,4,X,6,7,8,9
7 positions remaining
```

## Strategic Play (1:30-2:00)

### Action: Say "X in position 2"
"Let's continue. X in position 2."

"Notice how the context updates with each move:"

**Console shows:**
```
[CONTEXT] Ready for Voice+ NLU:
   Board: [O,2,3,4,X,6,7,8,9]
   Available: [2,3,4,6,7,8,9]
   Status: playing
```

"The NLU now knows position 1 has O, position 5 has X. It uses this information to make strategic decisions - blocking wins, taking winning moves."

## Key Technical Points (2:00-2:30)

"The critical aspects of this implementation:

1. **Complete State Transfer** - Every voice command includes the full board state
2. **Stateless Processing** - Voice+ doesn't remember previous moves; it analyzes fresh context
3. **Dual Move Response** - Both user and AI moves processed in single payload
4. **Real-time Context Updates** - Board state immediately reflects changes for next command

This pattern enables sophisticated voice interactions without complex session management."

## Completing the Game (2:30-2:45)

### Action: Continue playing until game ends

**Console shows (on win):**
```
[GAME OVER] VOICE+ WINS! Better luck next time.
Game state transition: playing -> won
```

## Conclusion (2:45-3:00)

"This demonstrates how Voice+ and NLX handle complex, stateful interactions through context transmission. The same pattern can be applied to any application requiring intelligent voice control - from form filling to multi-step workflows.

The key is sending complete, relevant context with each command, allowing the LLM to make informed decisions based on current application state."

---

## Quick Reference - Console Output Flow

1. **Game Start**
   - `=== NEW GAME STARTED ===`
   - Context initialization

2. **Each Move Cycle**
   - `[CONTEXT] Ready for Voice+ NLU` - Shows what's sent to Voice+
   - `=== VOICE+ PAYLOAD RECEIVED ===` - Voice+ response
   - Move processing logs
   - Board state updates

3. **Game End**
   - `[GAME OVER]` message
   - State transition log

## Voice Commands to Demonstrate

- "I want to play tic-tac-toe" - Start game
- "X in position [1-9]" - Make moves
- "Reset game" - Reset board
- "X in center" - Natural language position
- "Put X in top left" - Descriptive position

## Technical Highlights to Emphasize

- No session state required on Voice+ side
- Context-aware AI decision making
- Single request/response for both moves
- Real-time board state updates
- Natural language understanding of positions