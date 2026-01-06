
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
      <Layout title="Phiêu Lưu Toán Học" onBack={goHome}>
        <MathGame onFinish={handleFinish} />
      </Layout>
    );
  }

  if (currentGame === GameType.CLOCK) {
    return (
      <Layout title="Bậc Thầy Thời Gian" onBack={goHome}>
        <ClockGame onFinish={handleFinish} />
      </Layout>
    );
  }

  return (
    <Layout title="Toán Học Nhí">
      {showSuccess ? (
        <div className="text-center animate-in fade-in slide-in-from-bottom duration-700">
          <div className="text-8xl mb-6">🏆</div>
          <h2 className="text-4xl font-kids text-blue-600 mb-2">Làm Tốt Lắm!</h2>
          <p className="text-xl text-slate-600 mb-8">
            Bạn nhỏ đã nhận được <span className="text-3xl font-kids text-green-500">{lastScore}</span> ngôi sao lấp lánh! 🌟
          </p>
          <div className="flex flex-col gap-4">
            <button 
              onClick={goHome}
              className="w-full bg-blue-500 text-white font-kids text-2xl py-6 rounded-[2rem] border-b-8 border-blue-700 hover:-translate-y-1 transition-all active:scale-95"
            >
              Chơi Lại Thôi! 🎢
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
            <p className="text-slate-600 text-xl font-medium">Chào bạn nhỏ! 👋</p>
            <h2 className="text-2xl font-kids text-slate-800">Hôm nay chúng mình học gì nhỉ?</h2>
          </div>

          <div className="grid gap-6">
            <button 
              onClick={startMath}
              className="group relative bg-orange-100 hover:bg-orange-200 p-8 rounded-[3rem] border-4 border-orange-400 border-b-[12px] transition-all active:scale-95 flex items-center gap-6 overflow-hidden"
            >
              <div className="bg-orange-400 text-white text-5xl p-6 rounded-3xl shadow-lg">➕</div>
              <div className="text-left">
                <h3 className="font-kids text-3xl text-orange-600">Siêu Nhân Toán Học</h3>
                <p className="text-slate-600 font-medium">Cộng & Trừ trong phạm vi 20!</p>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10 text-9xl group-hover:scale-110 transition-transform">🔢</div>
            </button>

            <button 
              onClick={startClock}
              className="group relative bg-blue-100 hover:bg-blue-200 p-8 rounded-[3rem] border-4 border-blue-400 border-b-[12px] transition-all active:scale-95 flex items-center gap-6 overflow-hidden"
            >
              <div className="bg-blue-400 text-white text-5xl p-6 rounded-3xl shadow-lg">🕒</div>
              <div className="text-left">
                <h3 className="font-kids text-3xl text-blue-600">Nhà Du Hành Thời Gian</h3>
                <p className="text-slate-600 font-medium">Học cách xem đồng hồ kim!</p>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10 text-9xl group-hover:scale-110 transition-transform">⏰</div>
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
