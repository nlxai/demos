# Voice+ Demo App

<div>
  <a href="https://www.loom.com/share/aa8d29ee16cd463aa1ac66ebae29a3dc">
    <p>Voice+ Starter Kit - Hosted - Watch Video</p>
  </a>
  <a href="https://www.loom.com/share/aa8d29ee16cd463aa1ac66ebae29a3dc">
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/aa8d29ee16cd463aa1ac66ebae29a3dc-60f379b8e94b3822-full-play.gif">
  </a>
</div>

## Quick Start with Hosted

Try the demo immediately without any setup: **[https://d1b3aj4p8jmb8z.cloudfront.net](https://d1b3aj4p8jmb8z.cloudfront.net)**

1. Visit the hosted demo
2. Go to "Configure Touchpoint" to enter your NLX credentials
3. Click the microphone button and start using voice commands

## Quick Start Local

```bash
npm install
npm run dev
```

Open `http://localhost:5173/` and click the microphone button in the bottom-right corner.

## What It Does

This demo showcases **Voice+** integration with React, featuring:

**Voice Navigation**: Navigate between pages using natural voice commands:
- "go to contact" → navigates to contact page
- "show me pricing" → navigates to pricing page  
- "take me home" → navigates to home page
- "go back" / "go forward" → browser history navigation

**Voice Commands Test Lab**: Interactive components demonstrating custom voice commands:
- Counter control: "increment by 5", "decrement", "reset counter"
- Button interactions: "click the red button", "press submit"
- Form filling: "set name to John", "update email"
- Color changes: "change color to blue", "make it green"

**Voice Form Filling**: On the contact page, fill out forms by voice:
- "My name is John Smith" → fills first/last name fields
- "My email is john@company.com" → fills email field
- "My company is Acme Corp" → fills company field

**Configuration Management**: Built-in UI to configure your NLX Touchpoint settings with validation and real-time updates.

## Tech Stack

- **React 18** + TypeScript + Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **NLX Touchpoint UI** for voice interactions

## How to Create Custom Voice Commands

The app uses the `useTouchpointCustomCommand` hook to register voice commands. This hook internally uses `setCustomBidirectionalCommands` to register commands with the NLX system.

### Basic Usage

```tsx
import { useTouchpointCustomCommand } from '../contexts/TouchpointContext';

function MyComponent() {
  const [count, setCount] = useState(0);

  // Register a voice command
  useTouchpointCustomCommand({
    action: 'increment_counter',
    description: 'Increment the counter by a specified amount',
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number', description: 'Amount to increment by' }
      }
    },
    handler: (payload) => {
      const amount = payload?.amount || 1;
      setCount(prev => prev + amount);
    }
  });

  return <div>Count: {count}</div>;
}
```

### How It Works

1. **Registration**: The `useTouchpointCustomCommand` hook registers your command with the NLX system using `setCustomBidirectionalCommands`
2. **Voice Input**: When a user speaks a matching phrase, NLX processes it and triggers your handler
3. **Execution**: Your handler function receives the parsed payload and executes your custom logic

### Command Structure

Each command requires:

- **action**: Unique identifier for the command (e.g., 'increment_counter')
- **description**: Human-readable description for NLX to understand the command's purpose
- **schema**: JSON schema defining the expected payload structure
- **handler**: Function that executes when the command is triggered

### Real Examples

Check out these working examples in the codebase:

**Counter Commands** (`src/components/CounterTest.tsx`):
```tsx
useTouchpointCustomCommand({
  action: 'increment_counter',
  description: 'Increment the counter by a specified amount or by 1 if no amount is specified',
  schema: {
    type: 'object',
    properties: {
      amount: { type: 'number', description: 'Amount to increment by' }
    }
  },
  handler: (payload) => {
    const incrementAmount = payload?.amount || 1;
    setCount(prev => prev + incrementAmount);
  }
});
```

**Form Input Commands** (`src/components/FormInputTest.tsx`):
```tsx
useTouchpointCustomCommand({
  action: 'update_form_field',
  description: 'Update a form field with a new value',
  schema: {
    type: 'object',
    properties: {
      field: { type: 'string', description: 'Field to update (name, email, message)' },
      value: { type: 'string', description: 'New value for the field' }
    },
    required: ['field', 'value']
  },
  handler: (payload) => {
    const { field, value } = payload;
    updateFormField(field, value);
  }
});
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── *Test.tsx       # Voice command demo components
│   └── ...
├── contexts/
│   └── TouchpointContext.tsx  # Voice+ integration & custom command hook
├── pages/              # Route pages
│   ├── Home.tsx
│   ├── Commands.tsx    # Voice commands test lab
│   ├── Contact.tsx
│   └── Pricing.tsx
├── services/           # Configuration management
├── types/              # TypeScript definitions
└── utils/              # Validation utilities
```

## Configuration

The app includes a configuration management system accessible at `/configure-touchpoint`. You can:

- Set your NLX application URL
- Configure API key
- Select language code
- Test and validate configurations in real-time

The configuration is automatically saved to localStorage and can be reset to defaults.

## Navigation Commands

Built-in navigation commands are handled automatically:

- **page_next** → Navigate forward in browser history
- **page_previous** → Navigate backward in browser history  
- **page_custom** → Navigate to specific routes (supports paths like `/contact` or full URLs)
- **page_unknown** → Logs unknown navigation requests

## Build & Deploy

```bash
npm run build    # Creates dist/ folder
npm run preview  # Test production build locally
```

Deploy the `dist/` folder to any static hosting service (Netlify, Vercel, etc.).

## Next Steps

- Visit `/commands` to test various voice command patterns
- Explore the component source code to see implementation details
- Configure your own NLX application settings
- Create new voice-enabled components using the examples as templates