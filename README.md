# NLX Demo Applications

Welcome to the NLX Demo Applications repository! This collection provides hands-on examples to help you learn how to build conversational applications using NLX.

## What You'll Learn

By exploring these demos, you'll gain practical experience with:

- **Voice+ Integration**: Add voice capabilities to web applications
- **Touchpoint Configuration**: Set up and manage the Touchpoint SDK
- **Custom Voice Commands**: Create application-specific voice interactions
- **Real-time Conversation Management**: Handle dynamic user interactions

## Quick Start

### Prerequisites

- **Node.js** (version 16 or higher)
- **NLX Account**: [Sign up at nlx.ai](https://nlx.ai/platform)
- Basic knowledge of React/TypeScript (for current demos)

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd open-demos
   ```

2. **Choose a demo** from the list below and follow its specific setup instructions

3. **Configure your NLX credentials** in each demo's configuration section

## Available Demos

### React Voice+ Starter Kit

**Location**: [`react-voice+-starter/`](./react-voice+-starter/)

A comprehensive React application demonstrating voice-enabled interactions using NLX's *Voice+* capabilities.

**What it demonstrates**:
- Voice navigation between pages ("go to contact", "show me pricing")
- Custom voice commands for UI interactions
- Voice-controlled form filling
- Real-time touchpoint configuration
- Integration with `@nlxai/touchpoint-ui`

**Key Features**:
- Interactive voice command test lab
- Built-in configuration management UI
- Live hosted demo available
- Multiple voice interaction patterns

**Quick Start**:
```bash
cd react-voice+-starter
npm install
npm run dev
```

**Try it live**: [Hosted Demo](https://d1b3aj4p8jmb8z.cloudfront.net)


## NLX Platform Overview

These demos showcase various aspects of the NLX conversational AI platform:

### Core Products

- **Touchpoint**: SDK that can be embedded in applications
- **Voice+**: Advanced voice interaction capabilities for applications
- 
### Key SDKs Used

- `@nlxai/touchpoint-ui`: Pre-built touchpoint widgets and components
- `@nlxai/core`: Core conversation management functionality
- `@nlxai/voice-plus-core`: Voice interaction capabilities

## Resources

### Documentation
- [NLX Developer Documentation](https://developers.nlx.ai/) - Complete SDK reference and guides
- [Platform Documentation](https://docs.nlx.ai/) - Platform features and configuration
- [API Reference](https://developers.nlx.ai/api) - Detailed API documentation

### Getting Help
- [NLX Community](https://community.nlx.ai/) - Community support and discussions
- [Support Portal](https://support.nlx.ai/) - Official support channels
- [Learning Hub](https://learning.nlx.ai/) - Guided courses for building with NLX

### Video Resources
- [Voice+ Demo Walkthrough](https://www.loom.com/share/aa8d29ee16cd463aa1ac66ebae29a3dc) - Video overview of the voice starter kit


## Security Notes

- Never commit API keys or sensitive credentials
- Use environment variables for configuration
- Include `.env.example` files with placeholder values
- Document security best practices in demo READMEs

## License

This repository is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

*Built for the NLX developer community*

**Need help?** Check out our [documentation](https://developers.nlx.ai/) or reach out to the [community](https://community.nlx.ai/).
