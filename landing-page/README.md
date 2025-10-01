# NLX Demo Sandbox Landing Page

This is the landing page for the NLX Demo Sandbox, serving as the main entry point for all demo applications.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
landing-page/
├── src/
│   ├── components/     # Reusable components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── DemoCard.tsx
│   │   └── Footer.tsx
│   ├── pages/          # Page components
│   │   └── HomePage.tsx
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
└── package.json        # Dependencies
```

## 🎨 Styling

The project uses:
- **Tailwind CSS** for utility-first styling
- Custom NLX color palette defined in `tailwind.config.js`
- Responsive design for mobile and desktop

## 🔗 Adding New Demos

To add a new demo to the landing page:

1. Edit `src/pages/HomePage.tsx`
2. Add a new entry to the `demos` array:

```typescript
{
  id: 'your-demo-id',
  title: 'Your Demo Title',
  description: 'Brief description of what the demo showcases',
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3'
  ],
  demoUrl: '/your-demo-path/',
  githubUrl: 'https://github.com/nlxai/your-repo',
  liveUrl: 'https://your-live-url.com', // optional
  isExternal: false // set to true for external links
}
```

## 🚀 Deployment

This landing page is designed to be deployed to AWS S3 + CloudFront:

```bash
# Build the project
npm run build

# Deploy to S3
aws s3 sync dist/ s3://sandbox.nlx.ai/ --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## 🔧 Configuration

- **Port**: Development server runs on port 5174
- **Base URL**: Configured for root path (`/`)
- **Build Output**: Static files in `dist/` directory

## 📄 License

MIT License - see LICENSE file for details

