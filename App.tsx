
import React, { useState } from 'react';
import { GameType } from './types';
import Layout from './components/Layout';
import MathGame from './components/MathGame';
import ClockGame from './components/ClockGame';

const App: React.FC = () => {
  const [currentGame, setCurrentGame] = useState<GameType>(GameType.NONE);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastScore, setLastScore] = useState(0);

  const startMath = () => {
    setCurrentGame(GameType.MATH);
    setShowSuccess(false);
  };

  const startClock = () => {
    setCurrentGame(GameType.CLOCK);
    setShowSuccess(false);
  };

  const handleFinish = (score: number) => {
    setLastScore(score);
    setCurrentGame(GameType.NONE);
    setShowSuccess(true);
  };

  const goHome = () => {
    setCurrentGame(GameType.NONE);
    setShowSuccess(false);
  };

  if (currentGame === GameType.MATH) {
    return (
      <Layout title="Math Adventure" onBack={goHome}>
        <MathGame onFinish={handleFinish} />
      </Layout>
    );
  }

  if (currentGame === GameType.CLOCK) {
    return (
      <Layout title="Time Master" onBack={goHome}>
        <ClockGame onFinish={handleFinish} />
      </Layout>
    );
  }

  return (
    <Layout title="Math Explorer">
      {showSuccess ? (
        <div className="text-center animate-in fade-in slide-in-from-bottom duration-700">
          <div className="text-8xl mb-6">🏆</div>
          <h2 className="text-4xl font-kids text-blue-600 mb-2">Amazing Job!</h2>
          <p className="text-xl text-slate-600 mb-8">
            You got <span className="text-3xl font-kids text-green-500">{lastScore}</span> out of 10 stars! 🌟
          </p>
          <div className="flex flex-col gap-4">
            <button 
              onClick={goHome}
              className="w-full bg-blue-500 text-white font-kids text-2xl py-6 rounded-[2rem] border-b-8 border-blue-700 hover:-translate-y-1 transition-all active:scale-95"
            >
              Play Again! 🎢
            </button>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className={`text-2xl ${i < lastScore ? 'opacity-100' : 'opacity-20 grayscale'}`}
                >
                  ⭐
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="text-center mb-4">
            <p className="text-slate-600 text-xl font-medium">Hello, Explorer! 👋</p>
            <h2 className="text-2xl font-kids text-slate-800">What would you like to learn today?</h2>
          </div>

          <div className="grid gap-6">
            <button 
              onClick={startMath}
              className="group relative bg-orange-100 hover:bg-orange-200 p-8 rounded-[3rem] border-4 border-orange-400 border-b-[12px] transition-all active:scale-95 flex items-center gap-6 overflow-hidden"
            >
              <div className="bg-orange-400 text-white text-5xl p-6 rounded-3xl shadow-lg">➕</div>
              <div className="text-left">
                <h3 className="font-kids text-3xl text-orange-600">Math Master</h3>
                <p className="text-slate-600 font-medium">Add & Subtract up to 20!</p>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10 text-9xl group-hover:scale-110 transition-transform">🔢</div>
            </button>

            <button 
              onClick={startClock}
              className="group relative bg-blue-100 hover:bg-blue-200 p-8 rounded-[3rem] border-4 border-blue-400 border-b-[12px] transition-all active:scale-95 flex items-center gap-6 overflow-hidden"
            >
              <div className="bg-blue-400 text-white text-5xl p-6 rounded-3xl shadow-lg">🕒</div>
              <div className="text-left">
                <h3 className="font-kids text-3xl text-blue-600">Time Traveler</h3>
                <p className="text-slate-600 font-medium">Learn to read analog clocks!</p>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10 text-9xl group-hover:scale-110 transition-transform">⏰</div>
            </button>
          </div>

          <div className="mt-8 p-6 bg-yellow-100/50 rounded-3xl border-2 border-dashed border-yellow-400">
            <h4 className="font-kids text-yellow-700 mb-2">Teacher's Strategy Note:</h4>
            <ul className="text-slate-600 text-sm list-disc pl-4 space-y-1">
              <li>Difficulty increases every 3-4 questions automatically.</li>
              <li>AI-powered encouragement adapts to your performance.</li>
              <li>Visual-first learning with immediate tactile feedback.</li>
              <li>Safe environment: No negative numbers, no timers!</li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
