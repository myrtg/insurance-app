# Insurance Chatbot

A modern web application that provides insurance-related answers using multiple AI models. The application supports LLaMA 3, Mixtral, and TinyLLaMA models, with the ability to get responses from all models simultaneously or individually.

## Features

- Multi-model support (LLaMA 3, Mixtral, TinyLLaMA)
- Dataset matching for common insurance questions
- Modern, responsive UI with dark mode support
- Real-time chat interface
- Model selection panel
- Error handling and loading states

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Inter font
- Vercel-inspired design system

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd insurance-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

The application communicates with the following API endpoints:

- `/api/chat` - Get answers from all models + dataset match
- `/api/llama3` - Get answer from LLaMA 3 (Groq) only
- `/api/mixtral` - Get answer from Mixtral (Groq) only
- `/api/tinyllama` - Get answer from TinyLLaMA (local) only

## Development

The project uses:
- TypeScript for type safety
- Tailwind CSS for styling
- Next.js App Router for routing
- React Server Components where possible
- Client Components for interactive features

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
