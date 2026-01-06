# Toán Học Nhí: Học Mà Chơi 🎮

An interactive Vietnamese educational game for children to learn math and time-telling skills through fun gameplay.

## 🌟 Features

### Math Adventure (Phiêu Lưu Toán Học)
- Interactive math questions with progressive difficulty
- Addition and subtraction problems for young learners
- 10 questions per game session
- Multiple-choice format with 4 answer options
- Visual feedback for correct/incorrect answers
- Score tracking and performance feedback

### Time Master (Bậc Thầy Thời Gian)
- Clock reading practice
- Interactive analog clock display
- Multiple difficulty levels
- Engaging time-telling challenges
- Real-time progress tracking

## 🎯 Game Modes

### 1. Math Game
Progressive difficulty levels:
- **Easy (Questions 1-3)**: Numbers 0-10
- **Medium (Questions 4-7)**: Numbers up to 15
- **Hard (Questions 8-10)**: Numbers up to 20

### 2. Clock Game
Learn to read analog clocks and practice time-telling skills.

## 🛠️ Technology Stack

- **React 19.2.3** - UI framework
- **TypeScript 5.8.2** - Type-safe development
- **Vite 6.2.0** - Fast build tool and dev server
- **Google Gemini AI** - AI-powered features
- Modern React Hooks (useState, useEffect)

## 📁 Project Structure

```
jumi-math/
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
├── types.ts             # TypeScript type definitions
├── components/
│   ├── Layout.tsx       # Shared layout component
│   ├── MathGame.tsx     # Math game component
│   └── ClockGame.tsx    # Clock game component
├── services/
│   └── geminiService.ts # Google Gemini AI integration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite build configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jumi-math
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🎮 How to Play

1. **Select a Game**: Choose between "Phiêu Lưu Toán Học" (Math Adventure) or "Bậc Thầy Thời Gian" (Time Master)
2. **Answer Questions**: Select the correct answer from the available options
3. **Track Your Score**: See your performance after each question
4. **Complete the Game**: Finish all questions to see your final score
5. **Play Again**: Return to the home screen to start a new game

## 🌈 Game Features

- **Vietnamese Interface**: Fully localized for Vietnamese-speaking children
- **Progressive Difficulty**: Questions get harder as you advance
- **Instant Feedback**: Know immediately if your answer is correct
- **Score Tracking**: Keep track of your performance
- **Colorful UI**: Engaging and child-friendly design
- **Responsive Design**: Works on desktop and mobile devices

## 🔧 Configuration

The application uses Vite for building and development. Configuration can be modified in:
- `vite.config.ts` - Build and dev server settings
- `tsconfig.json` - TypeScript compiler options

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

This project is private and not licensed for public use.

## 👨‍👩‍👧‍👦 Target Audience

Designed for young children (ages 5-8) learning basic math and time-telling skills in Vietnamese.

---

Made with ❤️ for young learners
